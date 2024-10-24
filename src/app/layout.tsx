"use client";

import { Inter } from "next/font/google";
import "../styles/Global.css";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "styles/theme";
import GlobalStyles from "@mui/material/GlobalStyles";
import { SnackbarProvider } from "notistack";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SnackbarProvider>
        <GlobalStyles
          styles={{
            "*::-webkit-scrollbar": {
              width: "0.4em",
            },
            "*::-webkit-scrollbar-track": {
              "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
              background: "#f1f1f1",
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(97, 19, 168, 1)",
            },
          }}
        />
        <ThemeProvider theme={Theme}>
          <body className={"tw-h-screen tw-w-screen " + inter.className}>
            {children}
          </body>
        </ThemeProvider>
      </SnackbarProvider>
    </html>
  );
}
