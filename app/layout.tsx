import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Find trusted doctors near you | doctorsway.co.in",
  description:
    "Discover verified specialists, compare availability, and find the right doctor for your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
