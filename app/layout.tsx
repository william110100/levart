import { Metadata } from "next";
import { ReactNode } from "react";
import Provider from "./Provider";
import "./globals.scss";

export const metadata: Metadata = {
  applicationName:
    "Zamrood by Pandooin | Premium Travel Experiences in Indonesia",
  title: "Zamrood by Pandooin | Premium Travel Experiences in Indonesia",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
