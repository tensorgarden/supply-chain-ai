import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Supply Chain AI -- Demand Forecasting & Quality Control",
  description:
    "Portfolio demo: AI-powered supply chain dashboard for demand forecasting, quality control monitoring, inventory optimization, and supplier performance analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
