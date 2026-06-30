"use client";

import { useState, ChangeEvent } from "react";

interface CompanyFormProps {
  onChange: (formData: CompanyData) => void;
  data: CompanyData;
}

export interface CompanyData {
  companyName: string;
  businessNumber: string;
  managerName: string;
  managerPhone: string;
}

export default function CompanyForm({ onChange, data }: CompanyFormProps) {
  // 사업자번호 하이픈(-) 자동 삽입 및 유효성 검사 예시
  const handleBusinessNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    let formatted = raw;

    if (raw.length > 3 && raw.length <= 5) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
    } else if (raw.length > 5) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3, 5)}-${raw.slice(5, 10)}`;
    }

    onChange({ ...data, businessNumber: formatted });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    // 1. 전체 입력 양식임을 브라우저에 알리는 <form> 태그
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          2단계: 기업 및 담당자 정보 입력
        </h2>
        <p className="text-gray-500 text-sm">
          안전한 B2B 렌탈 계약 및 견적서 발행을 위해 회사 정보를 입력해 주세요.
        </p>
      </div>

      {/* 2. <fieldset>: 연관된 입력 항목들을 하나의 그룹으로 묶는 시맨틱 태그 */}
      <fieldset className="space-y-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
        {/* 3. <legend>: fieldset 그룹의 목적을 밝히는 제목 태그 */}
        <legend className="text-sm font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
          기업 정보
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 회사명 입력 */}
          <div className="flex flex-col gap-2">
            {/* 4. <label>: htmlFor를 통해 input의 id와 연결 (웹 접근성 핵심) */}
            <label
              htmlFor="companyName"
              className="text-sm font-semibold text-gray-700 flex items-center gap-1"
            >
              법인/회사명 <strong className="text-red-500 text-xs">*</strong>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={data.companyName}
              onChange={handleInputChange}
              placeholder="예: (주)볼트렌탈"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-colors shadow-sm"
              required
            />
          </div>

          {/* 사업자 등록 번호 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="businessNumber"
              className="text-sm font-semibold text-gray-700 flex items-center gap-1"
            >
              사업자 등록 번호{" "}
              <strong className="text-red-500 text-xs">*</strong>
            </label>
            <input
              type="text"
              id="businessNumber"
              name="businessNumber"
              value={data.businessNumber}
              onChange={handleBusinessNumberChange}
              maxLength={12}
              placeholder="000-00-00000"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-colors shadow-sm"
              required
            />
          </div>
        </div>
      </fieldset>

      {/* 담당자 정보 그룹 */}
      <fieldset className="space-y-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
        <legend className="text-sm font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
          담당자 정보
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 담당자 이름 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="managerName"
              className="text-sm font-semibold text-gray-700 flex items-center gap-1"
            >
              담당자 성함 <strong className="text-red-500 text-xs">*</strong>
            </label>
            <input
              type="text"
              id="managerName"
              name="managerName"
              value={data.managerName}
              onChange={handleInputChange}
              placeholder="홍길동 팀장"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-colors shadow-sm"
              required
            />
          </div>

          {/* 담당자 연락처 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="managerPhone"
              className="text-sm font-semibold text-gray-700 flex items-center gap-1"
            >
              연락처 <strong className="text-red-500 text-xs">*</strong>
            </label>
            <input
              type="tel" // 5. 전화번호 형식에 맞는 시맨틱 타입 명시
              id="managerPhone"
              name="managerPhone"
              value={data.managerPhone}
              onChange={handleInputChange}
              placeholder="010-1234-5678"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-colors shadow-sm"
              required
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
}
