import { Button, Paper, Select, Stack, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CostonButton = styled(Button)({
  color: "white",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
});

export const CustomInput = styled(TextField)({
  // font: "inherit",
  "& .MuiInputLabel-root": { color: "white" }, //styles the label
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& > fieldset": { borderColor: "gray" }, // Styles for border
  },
  "& .MuiOutlinedInput-root:hover": {
    "& > fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& .MuiInputLabel-root": { color: "white" },
    "& > fieldset": {
      "& .MuiInputLabel-root": { color: "white" },
      borderColor: "#fff",
    },
  },
});

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "rgb(0 30 60)",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: "white",
  borderRadius: "4px",
}));

export const ProfileStack = styled(Stack)({
  backgroundColor: "rgb(0 30 60)",
  padding: "1rem",
  borderRadius: "9px",
});

export const CustomSelect = styled(Select)({
  // font: "inherit",
  "& .MuiSelect-outlined": {
    color: "white",
  },
  "& .MuiSelect-select": {
    border: "2px solid gray",
  },
  "& .MuiSelect-icon": {
    color: "#fff",
  },
});
