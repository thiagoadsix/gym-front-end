import { globalCss } from ".";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
  },

  body: {
    "-webkit-font-smoothing": "antialiased",
  },

  "body, input, textarea, button, label": {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 400,
  },
});
