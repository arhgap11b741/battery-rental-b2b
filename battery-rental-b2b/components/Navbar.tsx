"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // 메뉴 활성화(Active) 스타일을 위한 헬퍼 함수
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* 왼쪽: 서비스 로고 영역 */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-green-600">
                Iseo
              </h1>
              <strong className="text-xl font-bold tracking-tight text-gray-950">
                Rental
              </strong>
              <small className="text-[10px] bg-green-50 text-green-700 font-semibold px-1.5 py-0.5 rounded border border-green-200">
                B2B
              </small>
            </Link>

            {/* 가운데: 메인 네비게이션 메뉴 */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-green-50 text-green-700 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                배터리 렌탈 신청
              </Link>

              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/dashboard")
                    ? "bg-green-50 text-green-700 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                기업용 대시보드
              </Link>
            </div>
          </div>

          {/* 오른쪽: 회원 정보 / 기업 파트너 영역 */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <strong className="text-xs font-semibold text-gray-800">
                넥슨코리아 (파트너 회원)
              </strong>
              <strong className="text-[10px] text-gray-400">
                nexon_b2b@nexon.com
              </strong>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm">
              NX
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
