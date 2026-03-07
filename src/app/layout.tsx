import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "미래로 보내는 편지",
  description: "1년 뒤의 나에게 소중한 마음을 전하세요.",
  openGraph: {
    title: "미래로 보내는 편지",
    description: "1년 뒤의 나에게 소중한 마음을 전하세요.",
    images: [
      {
        url: "/shareimage.png", // public 폴더에 넣은 파일 이름
        width: 700,
        height: 590,
      },
    ],
  },
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
