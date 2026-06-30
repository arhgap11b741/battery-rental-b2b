"use client";

import { CompanyData } from "./CompanyForm";

interface QuoteResultProps {
  calcResult: {
    totalPowerW: number;
    recommendedBatteryKw: number;
  };
  companyData: CompanyData;
}

export default function QuoteResult({
  calcResult,
  companyData,
}: QuoteResultProps) {
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const contractNo = `BAAS-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <article className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {" "}
          3단계: BaaS 맞춤형 렌탈 및 케어 견적서
        </h2>
        <p className="text-gray-500 text-sm">
          SK의 차세대 배터리 생애주기 플랫폼(BaaS AI) 표준 규격이 적용된 실시간
          명세서입니다.
        </p>
      </div>

      <div className="p-6 md:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-8 relative overflow-hidden">
        {/* 서비스 배지 */}
        <div className="absolute top-0 right-0 bg-green-700 text-white text-[11px] font-semibold px-4 py-1 rounded-bl-xl tracking-wider uppercase">
          BaaS AI Standard
        </div>

        {/* 문서 헤더 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6">
          <div>
            <strong className="text-xs text-green-600 uppercase font-bold tracking-wider">
              서비스형 배터리(BaaS) 제안서
            </strong>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              VoltRental BaaS Estimate
            </h3>
          </div>
          <div className="text-sm text-gray-500 space-y-1 sm:text-right">
            <p>
              <strong>조회일자:</strong> {today}
            </p>
            <p>
              <strong>관리번호:</strong>{" "}
              <code className="text-xs bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200 font-mono text-gray-700">
                {contractNo}
              </code>
            </p>
          </div>
        </div>

        {/* Section 1: 가입 기업 정보 (시맨틱 표 구조) */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            계약자 정보
          </h4>
          <div className="w-full overflow-hidden border border-gray-100 rounded-xl">
            <table className="w-full text-left border-collapse text-sm">
              <tbody>
                <tr className="border-b border-gray-100">
                  <th
                    scope="row"
                    className="w-1/3 p-3 bg-gray-50 font-semibold text-gray-600 border-r border-gray-100"
                  >
                    법인/회사명
                  </th>
                  <td className="p-3 font-bold text-gray-900">
                    {companyData.companyName}
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <th
                    scope="row"
                    className="w-1/3 p-3 bg-gray-50 font-semibold text-gray-600 border-r border-gray-100"
                  >
                    사업자 등록 번호
                  </th>
                  <td className="p-3 font-mono text-gray-800">
                    {companyData.businessNumber}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="w-1/3 p-3 bg-gray-50 font-semibold text-gray-600 border-r border-gray-100"
                  >
                    현장 담당자
                  </th>
                  <td className="p-3 text-gray-800">
                    {companyData.managerName} ({companyData.managerPhone})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: SK BaaS 표준 자산 배정 항목 */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            배정 자산 및 기술 명세
          </h4>
          <div className="w-full overflow-hidden border border-gray-100 rounded-xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500">
                  <th className="p-3 pl-4">제공 서비스 분과</th>
                  <th className="p-3">상세 명세 및 기술 사양</th>
                  <th className="p-3 text-right pr-4">수량 및 용량</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr>
                  <td className="p-3 pl-4 font-semibold text-gray-900">
                    이동형 고출력 ESS 하드웨어
                  </td>
                  <td className="p-3 text-xs text-gray-500">
                    SK 고에너지밀도 리튬이온 셀 기반 배터리 팩 시스템 (안전 마진
                    20% 포함)
                  </td>
                  <td className="p-3 text-right pr-4 font-bold text-gray-900">
                    {calcResult.recommendedBatteryKw} kWh
                  </td>
                </tr>
                <tr>
                  <td className="p-3 pl-4 font-semibold text-gray-900">
                    BaaS AI 원격 모니터링
                  </td>
                  <td className="p-3 text-xs text-gray-500">
                    실시간 데이터 수집, 배터리 상태(SoH) 진단 및 이상 징후 조기
                    감지 알림 서비스
                  </td>
                  <td className="p-3 text-right pr-4 text-xs text-green-600 font-medium">
                    기본 포함 (무료)
                  </td>
                </tr>
                <tr>
                  <td className="p-3 pl-4 font-semibold text-gray-900">
                    Eco-friendly Lifecycle 케어
                  </td>
                  <td className="p-3 text-xs text-gray-500">
                    사용 후 배터리 Reuse/Recycle 자원 선순환 에코시스템 연동
                    처리 비용
                  </td>
                  <td className="p-3 text-right pr-4 text-xs text-green-600 font-medium">
                    면제 (기본 패키지)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: 최종 요약 정보 박스 */}
        <div className="p-5 bg-green-50 rounded-2xl border border-green-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-green-900">
              최종 연동 인프라 사양
            </h4>
            <p className="text-xs text-green-700">
              행사 예상 총 피크 부하량:{" "}
              <strong>{calcResult.totalPowerW.toLocaleString()} W</strong>
            </p>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-green-600 block font-medium">
              BaaS AI 추천 용량
            </span>
            <strong className="text-3xl font-black text-green-700">
              {calcResult.recommendedBatteryKw} kWh
            </strong>
          </div>
        </div>

        {/* 서비스 가이드라인 풋터 */}
        <footer className="text-[11px] text-gray-400 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
          <p className="font-semibold text-gray-500 mb-1">
            {" "}
            SK BaaS 인프라 이용 규정 안내
          </p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>
              본 견적은 BaaS AI 플랫폼 진단 시스템에 의해 가계산되었으며, 현장
              인프라 실측에 따라 미세 조정될 수 있습니다.
            </li>
            <li>
              [가예약 신청하기] 완료 시, 데이터 관제 센터 엔지니어가 배터리 안전
              공급 가이드라인 수립을 위해 영업일 기준 24시간 내 연락을 드립니다.
            </li>
            <li>
              수거된 배터리는 친환경 가치 보존을 위해 에코 플랜트에 입고되어
              전량 에너지 재사용(Reuse) 자산으로 전환됩니다.
            </li>
          </ul>
        </footer>
      </div>
    </article>
  );
}
