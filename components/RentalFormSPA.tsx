"use client";

import { useState, useCallback } from "react";
import DeviceCalculator from "@/components/DeviceCalculator";
import CompanyForm, { CompanyData } from "@/components/CompanyForm";
import QuoteResult from "@/components/QuoteResult";

export default function RentalFormSPA() {
  const [step, setStep] = useState<number>(1);
  const [calcResult, setCalcResult] = useState({
    totalPowerW: 0,
    recommendedBatteryKw: 0,
  });
  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: "",
    businessNumber: "",
    managerName: "",
    managerPhone: "",
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // 의존성 배열을 비워 부모가 리렌더링되어도 함수 주소값을 고정
  const handleCalculate = useCallback(
    (totalPowerW: number, recommendedBatteryKw: number) => {
      setCalcResult({ totalPowerW, recommendedBatteryKw });
    },
    [],
  );

  const isCompanyFormValid = () => {
    return (
      companyData.companyName.trim() !== "" &&
      companyData.businessNumber.length === 12 &&
      companyData.managerName.trim() !== "" &&
      companyData.managerPhone.trim() !== ""
    );
  };

  const handleSubmit = () => {
    alert(
      ` [${companyData.companyName}]님의 가예약 신청이 정상 접수되었습니다!`,
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      {/*  진행 바 */}
      <div className="mb-10">
        <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
          <strong className={step >= 1 ? "text-green-600 font-bold" : ""}>
            01. 전력 계산기
          </strong>
          <strong className={step >= 2 ? "text-green-600 font-bold" : ""}>
            02. 기업 정보 입력
          </strong>
          <strong className={step >= 3 ? "text-green-600 font-bold" : ""}>
            03. 견적서 발행
          </strong>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* 단계별 화면 */}
      <div className="min-h-[400px] mb-8">
        {step === 1 && (
          // 무한 루프가 안 터지는 고정된 함수
          <DeviceCalculator onCalculate={handleCalculate} />
        )}
        {step === 2 && (
          <CompanyForm
            data={companyData}
            onChange={(newData) => setCompanyData(newData)}
          />
        )}
        {step === 3 && (
          <QuoteResult calcResult={calcResult} companyData={companyData} />
        )}
      </div>

      {/* 하단 네비게이션 */}
      <div className="flex justify-between items-center border-t border-gray-100 pt-6">
        <button
          type="button"
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
          type="button"
          onClick={step === 3 ? handleSubmit : nextStep}
          disabled={
            (step === 1 && calcResult.totalPowerW === 0) ||
            (step === 2 && !isCompanyFormValid())
          }
          className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-colors shadow-sm bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {step === 3 ? "가예약 신청하기" : "다음 단계로"}
        </button>
      </div>
    </div>
  );
}
