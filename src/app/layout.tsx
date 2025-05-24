import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // обери потрібні
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RentalCar",
  description:
    "Book a rental car in minutes. Wide selection of vehicles across the country. Simple terms and transparent pricing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
