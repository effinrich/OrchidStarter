// Enforces the standing rule: no inline styles — use Panda recipes / css() / Park UI.
export default [
  {
    files: ["app/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name='style']",
          message: "No inline styles. Use Panda recipes, css(), or Park UI components.",
        },
      ],
    },
  },
]
