import type { Metadata } from "next";
import "./globals.css";
import {MontserratExtraBold} from "@/app/fonts";
export const metadata: Metadata = {
  title: "Mobility Portal",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={MontserratExtraBold.className}>{children}</body>
    </html>
  );
}
