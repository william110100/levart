import "@mantine/charts/styles.css";
import "@mantine/core/styles.css";
import "./globals.scss";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  applicationName:
    "TyrAds: Boost Your Success with Top App Marketing Companies",
  description:
    "Drive massive app growth with TyrAds' expert app marketing services. Access 1.4 billion users and conquer the market! Visit our website now.",
  generator: "TyrAds",
  title: "TyrAds",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
