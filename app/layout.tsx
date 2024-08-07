import type { Metadata } from "next";
import "./globals.css";
import {MontserratMedium} from "@/app/fonts";
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
      <body className={MontserratMedium.className}>{children}</body>
    </html>
  );
}
