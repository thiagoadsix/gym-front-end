import { styled } from "@stitches/react";

export const Div = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f0f0f0",
});

export const Form = styled("form", {
  width: "350px",
  display: "flex",
  flexDirection: "column",
  background: "white",
  padding: "24px",
  borderRadius: "8px",
  boxShadow: "0 0 16px rgba(0,0,0,0.1)",
});

export const Label = styled("label", {
  marginBottom: "8px",
  alignSelf: "start",
  display: "block",
});
