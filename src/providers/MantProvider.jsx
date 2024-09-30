"use client";
import { createTheme, MantineProvider } from "@mantine/core";
import React from "react";

const theme = createTheme({});
const MantProvider = ({ children }) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};

export default MantProvider;
