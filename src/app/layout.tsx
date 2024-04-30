import type { Metadata } from "next";
import logo from "../../public/logo.png";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Веб-сайт для отслеживания погоды в любых городах",
  icons: {
    icon: "/favicon/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
