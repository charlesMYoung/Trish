import { nextui } from "@nextui-org/react";
import Typography from "@tailwindcss/typography";
import CusTypography from "./tailwind.theme";
import { PresetsConfig } from "tailwindcss/types/config";

export default {
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui(), Typography, CusTypography],
} satisfies PresetsConfig;
