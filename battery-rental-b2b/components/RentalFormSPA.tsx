"use client";

import { useState } from "react";

export default function RentalFormSPA() {
  //현재 신청 단계 관리 상태
  const [step, setStep] = useState<number>(1);
  //단계 이동 함수
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      {/* 상단 진행 바 (UI/UX 디테일) */}
      <div className="mb-10">
        <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
          <span className={step >= 1 ? "text-green-600 font-bold" : ""}>
            01. 전력 계산기
          </span>
          <span className={step >= 2 ? "text-green-600 font-bold" : ""}>
            02. 기업 정보 입력
          </span>
          <span className={step >= 3 ? "text-green-600 font-bold" : ""}>
            03. 견적서 발행
          </span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Step별 컴포넌트 조건부 렌더링 영역 */}
        <div className="min-h-[300px] mb-8">
          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold mb-2">
                1단계: 행사 전력량 계산
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                필요한 기기와 수량을 입력해 배터리 용량을 산출하세요.
              </p>
              {/* 임시 목데이터 UI */}
              <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                [여기에 전력 계산기 슬라이더나 입력창이 들어올 예정]
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-xl font-bold mb-2">
                2단계: 기업 및 담당자 정보
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                견적서 발급 및 계약 안내를 위한 정보를 입력해 주세요.
              </p>
              {/* 임시 목데이터 UI */}
              <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                [여기에 사업자번호, 회사명 입력 폼이 들어올 예정]
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-xl font-bold mb-2">
                3단계: 맞춤 견적서 발행 완료
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                산출된 견적서를 확인하고 PDF로 다운로드하세요.
              </p>
              {/* 임시 목데이터 UI */}
              <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                [여기에 견적서 미리보기 및 PDF 다운로드 버튼이 들어올 예정]
              </div>
            </div>
          )}
        </div>

        {/* 하단 네비게이션 버튼 (이전 / 다음) */}
        <div className="flex justify-between items-center border-t border-gray-100 pt-6">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              step === 1
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            이전으로
          </button>

          <button
            onClick={nextStep}
            className="px-6 py-2.5 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors shadow-sm"
          >
            {step === 3 ? "가예약 신청하기" : "다음 단계로"}
          </button>
        </div>
      </div>
    </div>
  );
}
