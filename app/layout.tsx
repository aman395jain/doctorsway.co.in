import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/landing/site-header";

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
      <body>
      <SiteHeader />
        <section className="content-container" aria-label="Main content">
          {children}
        </section>
      <footer className="site-footer">
        © 2026 doctorsway.co.in · Your care, closer to home.
      </footer>
      </body>
    </html>
  );
}
