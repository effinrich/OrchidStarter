/**
 * Perch — drop-in voice assistant for any website.
 * Vanilla JS, zero dependencies, zero build. One <script> tag.
 *
 * Usage (HTML):
 *   <script src="https://cdn.perch.app/perch.js"
 *           data-agent-id="AGENT_ID"
 *           data-session-url="https://your-app.com/api/perch/session"
 *           data-accent="#6D5EF6"
 *           data-position="bottom-right"
 *           defer></script>
 *
 * The script auto-initializes from its own data-* attributes, and also exposes a
 * global `Perch` API: Perch.init(config), Perch.open(), Perch.close().
 */
(function () {
  "use strict";
  if (window.Perch && window.Perch.__loaded) return;

  var DEFAULTS = {
    agentId: "",
    sessionUrl: "",           // your server endpoint that mints an ElevenLabs signed URL
    accent: "#6D5EF6",
    position: "bottom-right", // bottom-right | bottom-left
    label: "Talk to us",
    title: "Voice assistant",
  };

  function readScriptConfig() {
    var el = document.currentScript ||
      document.querySelector('script[src*="perch.js"]');
    if (!el) return {};
    var d = el.dataset || {};
    var cfg = {};
    if (d.agentId) cfg.agentId = d.agentId;
    if (d.sessionUrl) cfg.sessionUrl = d.sessionUrl;
    if (d.accent) cfg.accent = d.accent;
    if (d.position) cfg.position = d.position;
    if (d.label) cfg.label = d.label;
    if (d.title) cfg.title = d.title;
    return cfg;
  }

  var STATE = { IDLE: "idle", CONNECTING: "connecting", LIVE: "live", ENDED: "ended", ERROR: "error" };

  function Widget(config) {
    this.cfg = Object.assign({}, DEFAULTS, config || {});
    this.state = STATE.IDLE;
    this.conversation = null; // ElevenLabs Conversation instance lives here
    this._build();
  }

  Widget.prototype._build = function () {
    var host = document.createElement("div");
    host.setAttribute("data-perch-host", "");
    host.style.position = "fixed";
    host.style.zIndex = "2147483000";
    host.style[this.cfg.position.indexOf("left") > -1 ? "left" : "right"] = "20px";
    host.style.bottom = "20px";
    document.body.appendChild(host);

    var root = host.attachShadow({ mode: "open" }); // isolate from host page CSS
    root.innerHTML = this._css() + this._html();
    this.root = root;

    this.fab = root.querySelector(".fab");
    this.panel = root.querySelector(".panel");
    this.talkBtn = root.querySelector(".talk");
    this.status = root.querySelector(".status");

    var self = this;
    this.fab.addEventListener("click", function () { self.open(); });
    root.querySelector(".close").addEventListener("click", function () { self.close(); });
    this.talkBtn.addEventListener("click", function () { self.toggle(); });
  };

  Widget.prototype._css = function () {
    var a = this.cfg.accent;
    return "<style>" +
      ":host,*{box-sizing:border-box;font-family:'Segoe UI',Helvetica,Arial,sans-serif}" +
      ".fab{width:60px;height:60px;border-radius:50%;border:0;cursor:pointer;" +
      "background:linear-gradient(135deg," + a + ",#22C1C3);box-shadow:0 8px 24px rgba(20,23,38,.25);" +
      "display:flex;align-items:center;justify-content:center}" +
      ".fab svg{width:26px;height:26px}" +
      ".panel{position:absolute;bottom:74px;right:0;width:300px;background:#fff;border-radius:16px;" +
      "box-shadow:0 16px 48px rgba(20,23,38,.28);overflow:hidden;display:none}" +
      ".panel.open{display:block}" +
      ".hd{background:linear-gradient(135deg," + a + ",#22C1C3);color:#fff;padding:14px 16px;" +
      "display:flex;align-items:center;justify-content:space-between}" +
      ".hd b{font-size:14px}" +
      ".close{background:transparent;border:0;color:#fff;font-size:18px;cursor:pointer;line-height:1}" +
      ".body{padding:22px 16px;text-align:center}" +
      ".talk{width:88px;height:88px;border-radius:50%;border:0;cursor:pointer;color:#fff;font-size:13px;font-weight:700;" +
      "background:linear-gradient(135deg," + a + ",#22C1C3);box-shadow:0 8px 20px rgba(20,23,38,.2)}" +
      ".talk.live{animation:pulse 1.4s infinite}" +
      "@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(109,94,246,.5)}70%{box-shadow:0 0 0 16px rgba(109,94,246,0)}100%{box-shadow:0 0 0 0 rgba(109,94,246,0)}}" +
      ".status{margin-top:14px;color:#667085;font-size:12px;min-height:16px}" +
      ".brand{margin-top:16px;font-size:10px;color:#98a2b3}" +
      "</style>";
  };

  Widget.prototype._html = function () {
    var mic = '<svg viewBox="0 0 24 24" fill="none"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Z" fill="#fff"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
    return '<div class="panel" role="dialog" aria-label="' + esc(this.cfg.title) + '">' +
      '<div class="hd"><b>' + esc(this.cfg.title) + '</b><button class="close" aria-label="Close">×</button></div>' +
      '<div class="body">' +
      '<button class="talk" aria-label="Start talking">Tap to talk</button>' +
      '<div class="status" aria-live="polite"></div>' +
      '<div class="brand">powered by Perch</div>' +
      '</div></div>' +
      '<button class="fab" aria-label="' + esc(this.cfg.label) + '">' + mic + '</button>';
  };

  Widget.prototype.open = function () { this.panel.classList.add("open"); };
  Widget.prototype.close = function () { this.panel.classList.remove("open"); if (this.state === STATE.LIVE) this.hangup(); };

  Widget.prototype.toggle = function () {
    if (this.state === STATE.LIVE || this.state === STATE.CONNECTING) this.hangup();
    else this.connect();
  };

  Widget.prototype._set = function (state, msg) {
    this.state = state;
    this.status.textContent = msg || "";
    this.talkBtn.classList.toggle("live", state === STATE.LIVE);
    this.talkBtn.textContent =
      state === STATE.LIVE ? "Listening…" :
      state === STATE.CONNECTING ? "Connecting…" : "Tap to talk";
  };

  Widget.prototype.connect = async function () {
    if (!this.cfg.sessionUrl) { this._set(STATE.ERROR, "No sessionUrl configured."); return; }
    this._set(STATE.CONNECTING, "Starting session…");
    try {
      // 1) Ask YOUR server for a short-lived signed URL (keeps the API key server-side).
      var res = await fetch(this.cfg.sessionUrl, { method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ agentId: this.cfg.agentId }) });
      if (!res.ok) throw new Error("session " + res.status);
      var data = await res.json(); // { signedUrl }

      // 2) === ElevenLabs Conversational AI plugs in HERE ===
      //    import { Conversation } from "@elevenlabs/client"
      //    this.conversation = await Conversation.startSession({
      //      signedUrl: data.signedUrl,
      //      onModeChange: (m) => this._set(STATE.LIVE, m.mode === "speaking" ? "Speaking…" : "Listening…"),
      //      onDisconnect: () => this._set(STATE.ENDED, "Ended."),
      //      onError: (e) => this._set(STATE.ERROR, String(e)),
      //    })
      //    (Requires mic permission; the SDK handles WebRTC + streaming audio.)

      // --- Demo fallback so the UI is runnable without keys: ---
      if (!data || !data.signedUrl) { this._set(STATE.LIVE, "Demo mode — wire the ElevenLabs SDK here."); return; }
      this._set(STATE.LIVE, "Connected.");
    } catch (e) {
      this._set(STATE.ERROR, "Couldn't connect. Check your session endpoint.");
    }
  };

  Widget.prototype.hangup = function () {
    // if (this.conversation) this.conversation.endSession()
    this.conversation = null;
    this._set(STATE.IDLE, "");
  };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var instance = null;
  var Perch = {
    __loaded: true,
    init: function (config) { if (!instance) instance = new Widget(config); return instance; },
    open: function () { if (instance) instance.open(); },
    close: function () { if (instance) instance.close(); },
  };
  window.Perch = Perch;

  // auto-init from the script tag's data-* attributes
  var auto = readScriptConfig();
  if (auto.agentId || auto.sessionUrl) {
    if (document.body) Perch.init(auto);
    else window.addEventListener("DOMContentLoaded", function () { Perch.init(auto); });
  }
})();
