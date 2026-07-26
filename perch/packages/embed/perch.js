/**
 * Perch — drop-in voice assistant for any website.
 * Vanilla JS, zero dependencies, zero build. One <script> tag.
 * Liquid-glass UI: glassmorphism panel, animated gradient orbs, live waveform.
 *
 * Usage (HTML):
 *   <script src="https://cdn.perch.app/perch.js"
 *           data-agent-id="AGENT_ID"
 *           data-session-url="https://your-app.com/api/perch/session"
 *           data-accent="#6D5EF6"
 *           data-position="bottom-right"
 *           defer></script>
 *
 * Global API: Perch.init(config), Perch.open(), Perch.close().
 */
(function () {
  "use strict";
  if (window.Perch && window.Perch.__loaded) return;

  var DEFAULTS = {
    agentId: "",
    sessionUrl: "",
    accent: "#6D5EF6",
    accent2: "#22C1C3",
    position: "bottom-right",
    label: "Talk to us",
    title: "Voice assistant",
    // ElevenLabs Conversational AI client, loaded on demand (buildless).
    // Pin a version in production, e.g. https://esm.sh/@elevenlabs/client@0.x
    sdkUrl: "https://esm.sh/@elevenlabs/client",
    // Mock mode: scripts a fake conversation (no key, no endpoint) for demos/recordings.
    mock: false,
  };

  function readScriptConfig() {
    var el = document.currentScript || document.querySelector('script[src*="perch.js"]');
    if (!el) return {};
    var d = el.dataset || {};
    var cfg = {};
    ["agentId", "sessionUrl", "accent", "accent2", "position", "label", "title", "sdkUrl", "mock"].forEach(function (k) {
      if (d[k]) cfg[k] = d[k];
    });
    return cfg;
  }

  var STATE = { IDLE: "idle", CONNECTING: "connecting", LIVE: "live", ENDED: "ended", ERROR: "error" };

  function Widget(config) {
    this.cfg = Object.assign({}, DEFAULTS, config || {});
    this.state = STATE.IDLE;
    this.conversation = null;
    this._build();
  }

  Widget.prototype._build = function () {
    var host = document.createElement("div");
    host.setAttribute("data-perch-host", "");
    host.style.position = "fixed";
    host.style.zIndex = "2147483000";
    host.style[this.cfg.position.indexOf("left") > -1 ? "left" : "right"] = "22px";
    host.style.bottom = "22px";
    document.body.appendChild(host);

    var root = host.attachShadow({ mode: "open" });
    root.innerHTML = this._css() + this._html();
    this.root = root;

    this.fab = root.querySelector(".fab");
    this.panel = root.querySelector(".panel");
    this.talkBtn = root.querySelector(".talk");
    this.status = root.querySelector(".status");
    this.wave = root.querySelector(".wave");

    var self = this;
    this.fab.addEventListener("click", function () { self.open(); });
    root.querySelector(".close").addEventListener("click", function () { self.close(); });
    this.talkBtn.addEventListener("click", function () { self.toggle(); });
  };

  Widget.prototype._css = function () {
    var a = this.cfg.accent, b = this.cfg.accent2;
    return "<style>" +
      ":host,*{box-sizing:border-box;font-family:'Segoe UI',Helvetica,Arial,sans-serif;margin:0}" +
      "@keyframes pfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}" +
      "@keyframes pspin{to{transform:rotate(360deg)}}" +
      "@keyframes pin{from{opacity:0;transform:translateY(14px) scale(.94)}to{opacity:1;transform:translateY(0) scale(1)}}" +
      "@keyframes pdrift1{0%,100%{transform:translate(0,0)}50%{transform:translate(34px,22px)}}" +
      "@keyframes pdrift2{0%,100%{transform:translate(0,0)}50%{transform:translate(-28px,-22px)}}" +
      "@keyframes pbounce{0%,100%{height:6px}50%{height:22px}}" +
      "@keyframes ppulse{0%{box-shadow:0 0 0 0 " + rgba(a,.5) + ",0 14px 34px " + rgba(a,.42) + "}" +
        "70%{box-shadow:0 0 0 24px " + rgba(a,0) + ",0 14px 34px " + rgba(a,.42) + "}" +
        "100%{box-shadow:0 0 0 0 " + rgba(a,0) + ",0 14px 34px " + rgba(a,.42) + "}}" +
      // FAB liquid-glass orb
      ".fab{position:relative;width:64px;height:64px;border-radius:50%;border:0;cursor:pointer;overflow:hidden;" +
        "background:linear-gradient(135deg," + a + "," + b + ");" +
        "box-shadow:0 12px 32px " + rgba(a,.4) + ",inset 0 1px 0 rgba(255,255,255,.45);" +
        "display:flex;align-items:center;justify-content:center;animation:pfloat 5s ease-in-out infinite;" +
        "transition:transform .3s cubic-bezier(.2,.8,.2,1)}" +
      ".fab:hover{transform:translateY(-2px) scale(1.06)}" +
      ".fab::before{content:'';position:absolute;inset:-45%;background:conic-gradient(from 0deg," + a + "," + b + ",#8B7BFF," + a + ");" +
        "animation:pspin 6s linear infinite;filter:blur(9px);opacity:.65}" +
      ".fab svg{position:relative;z-index:1}" +
      // Glass panel
      ".panel{position:absolute;bottom:82px;right:0;width:322px;overflow:hidden;border-radius:26px;display:none;" +
        "background:rgba(255,255,255,.55);-webkit-backdrop-filter:blur(26px) saturate(180%);backdrop-filter:blur(26px) saturate(180%);" +
        "border:1px solid rgba(255,255,255,.65);box-shadow:0 26px 64px rgba(20,23,38,.34),inset 0 1px 0 rgba(255,255,255,.75)}" +
      ".panel.open{display:block;animation:pin .34s cubic-bezier(.2,.9,.2,1)}" +
      // aurora blobs
      ".aurora{position:absolute;inset:0;overflow:hidden;z-index:0;pointer-events:none}" +
      ".aurora i{position:absolute;width:190px;height:190px;border-radius:50%;filter:blur(44px);opacity:.5}" +
      ".aurora i:nth-child(1){background:" + a + ";top:-46px;left:-34px;animation:pdrift1 13s ease-in-out infinite}" +
      ".aurora i:nth-child(2){background:" + b + ";bottom:-54px;right:-34px;animation:pdrift2 15s ease-in-out infinite}" +
      ".hd{position:relative;z-index:1;color:#151726;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;" +
        "border-bottom:1px solid rgba(255,255,255,.45)}" +
      ".hd b{font-size:14px;font-weight:700}" +
      ".close{background:rgba(255,255,255,.45);border:0;color:#151726;width:26px;height:26px;border-radius:50%;font-size:15px;" +
        "cursor:pointer;line-height:1;transition:background .2s}.close:hover{background:rgba(255,255,255,.85)}" +
      ".body{position:relative;z-index:1;padding:28px 18px 22px;text-align:center}" +
      // liquid talk orb
      ".talk{position:relative;width:98px;height:98px;border-radius:50%;border:0;cursor:pointer;color:#fff;font-size:12px;font-weight:700;overflow:hidden;" +
        "background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.5),transparent 42%),linear-gradient(135deg," + a + "," + b + ");" +
        "box-shadow:0 14px 34px " + rgba(a,.42) + ",inset 0 2px 8px rgba(255,255,255,.5);" +
        "transition:transform .25s cubic-bezier(.2,.8,.2,1)}" +
      ".talk:hover{transform:scale(1.06)}" +
      ".talk::before{content:'';position:absolute;inset:-30%;background:conic-gradient(from 90deg," + a + "," + b + ",#8B7BFF," + a + ");" +
        "animation:pspin 5s linear infinite;filter:blur(11px);opacity:0;transition:opacity .3s}" +
      ".talk.live::before{opacity:.85}.talk.live{animation:ppulse 1.6s ease-out infinite}" +
      ".talk span{position:relative;z-index:1}" +
      // waveform
      ".wave{display:flex;gap:4px;justify-content:center;align-items:flex-end;height:24px;margin-top:18px;opacity:.3;transition:opacity .3s}" +
      ".wave.live{opacity:1}" +
      ".wave i{width:4px;height:6px;border-radius:3px;background:linear-gradient(" + a + "," + b + ")}" +
      ".wave.live i{animation:pbounce 1s ease-in-out infinite}" +
      ".wave.live i:nth-child(2){animation-delay:.12s}.wave.live i:nth-child(3){animation-delay:.24s}" +
      ".wave.live i:nth-child(4){animation-delay:.32s}.wave.live i:nth-child(5){animation-delay:.16s}" +
      ".status{position:relative;z-index:1;margin-top:14px;color:#475467;font-size:12px;min-height:16px}" +
      ".brand{position:relative;z-index:1;margin-top:14px;font-size:10px;color:#98a2b3;letter-spacing:.3px}" +
      "</style>";
  };

  Widget.prototype._html = function () {
    var mic = '<svg viewBox="0 0 24 24" width="26" height="26" fill="none"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Z" fill="#fff"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
    return '<div class="panel" role="dialog" aria-label="' + esc(this.cfg.title) + '">' +
      '<div class="aurora"><i></i><i></i></div>' +
      '<div class="hd"><b>' + esc(this.cfg.title) + '</b><button class="close" aria-label="Close">×</button></div>' +
      '<div class="body">' +
      '<button class="talk" aria-label="Start talking"><span>Tap to talk</span></button>' +
      '<div class="wave"><i></i><i></i><i></i><i></i><i></i></div>' +
      '<div class="status" aria-live="polite"></div>' +
      '<div class="brand">powered by Perch</div>' +
      '</div></div>' +
      '<button class="fab" aria-label="' + esc(this.cfg.label) + '">' + mic + '</button>';
  };

  Widget.prototype.open = function () { this.panel.classList.add("open"); };
  Widget.prototype.close = function () { this.panel.classList.remove("open"); if (this.state === STATE.LIVE) this.hangup(); };
  Widget.prototype.toggle = function () {
    if (this.state === STATE.LIVE || this.state === STATE.CONNECTING) this.hangup(); else this.connect();
  };

  Widget.prototype._set = function (state, msg, mode) {
    this.state = state;
    this.status.textContent = msg || "";
    var live = state === STATE.LIVE;
    this.talkBtn.classList.toggle("live", live);
    this.wave.classList.toggle("live", live);
    this.talkBtn.querySelector("span").textContent =
      state === STATE.CONNECTING ? "Connecting…"
        : live ? (mode === "speaking" ? "Speaking…" : "Listening…")
        : "Tap to talk";
  };

  // Scripted fake conversation — no key, no endpoint. Great for demos / recordings.
  Widget.prototype._runMock = function () {
    var self = this;
    clearTimeout(this._mockT);
    var turns = [
      { mode: "listening", text: "", ms: 1500 },
      { mode: "speaking", text: "Hey! I'm your Perch assistant — how can I help?", ms: 2600 },
      { mode: "listening", text: "", ms: 1600 },
      { mode: "speaking", text: "Sure — I can walk you through that. One sec…", ms: 2500 },
      { mode: "listening", text: "", ms: 1600 },
      { mode: "speaking", text: "Done! Anything else?", ms: 2200 },
    ];
    var i = 0;
    this._set(STATE.CONNECTING, "Starting session…");
    var step = function () {
      if (self.state === STATE.IDLE) return; // stopped by hangup
      if (i >= turns.length) i = 0; // loop the demo
      var t = turns[i++];
      self._set(STATE.LIVE, t.text, t.mode);
      self._mockT = setTimeout(step, t.ms);
    };
    this._mockT = setTimeout(step, 800);
  };

  Widget.prototype.connect = async function () {
    // Mock mode (or no endpoint configured): run the scripted demo conversation.
    if (this.cfg.mock === true || this.cfg.mock === "true" || !this.cfg.sessionUrl) { this._runMock(); return; }
    this._set(STATE.CONNECTING, "Starting session…");
    var self = this;
    try {
      // 1) Ask YOUR server for a short-lived signed URL (keeps the API key server-side).
      var res = await fetch(this.cfg.sessionUrl, {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ agentId: this.cfg.agentId }),
      });
      if (!res.ok) throw new Error("session " + res.status);
      var data = await res.json(); // { signedUrl }
      if (!data || !data.signedUrl) { this._runMock(); return; }

      // 2) Load the ElevenLabs Conversational AI client on demand (no build step),
      //    then start the live mic <-> agent session (WebRTC; SDK requests mic permission).
      var mod = await import(/* @vite-ignore */ this.cfg.sdkUrl);
      var Conversation = mod.Conversation;
      this.conversation = await Conversation.startSession({
        signedUrl: data.signedUrl,
        onStatusChange: function (s) {
          var st = s && s.status;
          if (st === "connected") self._set(STATE.LIVE, "Connected.");
          else if (st === "disconnected") self._set(STATE.IDLE, "");
          else if (st === "connecting") self._set(STATE.CONNECTING, "Connecting…");
        },
        onModeChange: function (m) {
          if (self.state !== STATE.LIVE) return;
          self._set(STATE.LIVE, "", m && m.mode === "speaking" ? "speaking" : "listening");
        },
        onError: function (e) { self._set(STATE.ERROR, "Error: " + ((e && e.message) || e)); },
      });
    } catch (e) {
      var s = String((e && e.message) || e);
      var msg = /permission|NotAllowed|denied/i.test(s) ? "Microphone permission needed."
        : /import|module|fetch/i.test(s) ? "Couldn't load the voice SDK."
        : "Couldn't connect. Check your session endpoint.";
      this._set(STATE.ERROR, msg);
    }
  };

  Widget.prototype.hangup = async function () {
    clearTimeout(this._mockT);
    try { if (this.conversation && this.conversation.endSession) await this.conversation.endSession(); } catch (e) {}
    this.conversation = null;
    this._set(STATE.IDLE, "");
  };

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function rgba(hex, alpha) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + alpha + ")";
  }

  var instance = null;
  var Perch = {
    __loaded: true,
    init: function (config) { if (!instance) instance = new Widget(config); return instance; },
    open: function () { if (instance) instance.open(); },
    close: function () { if (instance) instance.close(); },
  };
  window.Perch = Perch;

  var auto = readScriptConfig();
  if (auto.agentId || auto.sessionUrl) {
    if (document.body) Perch.init(auto);
    else window.addEventListener("DOMContentLoaded", function () { Perch.init(auto); });
  }
})();
