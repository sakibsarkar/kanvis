import ProviderContainer from "@/provider/ProviderContainer";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kanvis",
  description: "Designer canvas for your designs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quickSand.className}>
        <ProviderContainer>{children}</ProviderContainer>
      </body>
    </html>
  );
}
