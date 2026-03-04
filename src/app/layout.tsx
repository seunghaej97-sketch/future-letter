import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "미래로 보내는 편지",
  description: "1년 뒤의 나에게 보내는 편지 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
