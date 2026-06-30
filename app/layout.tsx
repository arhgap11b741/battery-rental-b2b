import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "VoltRental - B2B 에너지 솔루션",
  description: "축제 및 행사용 대용량 친환경 배터리 렌탈 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased text-gray-900 bg-gray-50">
        {/* 전체를 위아래로만 나눔 */}
        <div className="flex flex-col min-h-screen">
          <Navbar />

          {/*  메인 콘텐츠 영역 (중앙 정렬 및 반응형 여백 추가) */}
          <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
