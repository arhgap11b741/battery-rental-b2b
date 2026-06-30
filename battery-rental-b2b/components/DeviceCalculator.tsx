"use client";

import { useState, useEffect } from "react";
import { DeviceOption, SelectedDevice } from "@/types/rental";

const HARDWARE_PRESETS: DeviceOption[] = [
  {
    id: "speaker",
    name: "공연용 대형 스피커/음향",
    defaultPower: 1500,
    category: "음향/영상",
  },
  {
    id: "lighting",
    name: "무대 LED 조명 (1조)",
    defaultPower: 400,
    category: "조명",
  },
  {
    id: "coffee",
    name: "행사용 2그룹 커피머신",
    defaultPower: 3000,
    category: "식음료",
  },
];

interface DeviceCalculatorProps {
  onCalculate: (totalPowerW: number, recommendedBatteryKw: number) => void;
}

export default function DeviceCalculator({
  onCalculate,
}: DeviceCalculatorProps) {
  const [selectedDevices, setSelectedDevices] = useState<SelectedDevice[]>([
    { deviceId: "speaker", count: 0, hoursPerDay: 4 },
    { deviceId: "lighting", count: 0, hoursPerDay: 6 },
    { deviceId: "coffee", count: 0, hoursPerDay: 5 },
  ]);

  const [totals, setTotals] = useState({
    totalPowerW: 0,
    recommendedBatteryKw: 0,
  });

  useEffect(() => {
    let currentPower = 0;
    let currentEnergy = 0;

    selectedDevices.forEach((item) => {
      const preset = HARDWARE_PRESETS.find((p) => p.id === item.deviceId);
      if (preset && item.count > 0) {
        const devicePower = preset.defaultPower * item.count;
        currentPower += devicePower;
        currentEnergy += devicePower * item.hoursPerDay;
      }
    });

    const recommendedKw = parseFloat(((currentEnergy * 1.2) / 1000).toFixed(1));

    setTotals({
      totalPowerW: currentPower,
      recommendedBatteryKw: recommendedKw,
    });

    onCalculate(currentPower, recommendedKw);
  }, [selectedDevices, onCalculate]);

  // 간결한 값 변경 핸들러
  const updateDeviceValue = (
    deviceId: string,
    field: "count" | "hoursPerDay",
    value: number,
  ) => {
    setSelectedDevices((prev) =>
      prev.map((item) =>
        item.deviceId === deviceId ? { ...item, [field]: value } : item,
      ),
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {" "}
          1단계: 행사 전력량 계산
        </h2>
        <p className="text-gray-500 text-sm">
          행사에 사용할 기기들의 수량과 예상 사용 시간을 설정하세요.
        </p>
      </div>

      <div className="space-y-4">
        {HARDWARE_PRESETS.map((device) => {
          const userChoice = selectedDevices.find(
            (d) => d.deviceId === device.id,
          )!;
          return (
            <div
              key={device.id}
              className="p-5 bg-gray-50 rounded-xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                  {device.category}
                </span>
                <h3 className="text-base font-bold text-gray-800 mt-1">
                  {device.name}
                </h3>
                <small className="text-xs text-gray-400">
                  대당 기준 소비전력: {device.defaultPower}W
                </small>
              </div>

              <div className="flex items-center gap-6 self-end md:self-center">
                <div className="flex flex-col items-center">
                  <span className="text-[11px] text-gray-400 mb-1 font-medium">
                    수량
                  </span>
                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() =>
                        updateDeviceValue(
                          device.id,
                          "count",
                          Math.max(0, userChoice.count - 1),
                        )
                      }
                      className="w-7 h-7 rounded bg-gray-50 flex items-center justify-center text-sm font-bold hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {userChoice.count}대
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateDeviceValue(
                          device.id,
                          "count",
                          userChoice.count + 1,
                        )
                      }
                      className="w-7 h-7 rounded bg-gray-50 flex items-center justify-center text-sm font-bold hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[11px] text-gray-400 mb-1 font-medium">
                    시간 (하루)
                  </span>
                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() =>
                        updateDeviceValue(
                          device.id,
                          "hoursPerDay",
                          Math.max(1, userChoice.hoursPerDay - 1),
                        )
                      }
                      className="w-7 h-7 rounded bg-gray-50 flex items-center justify-center text-sm font-bold hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-semibold">
                      {userChoice.hoursPerDay}시간
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateDeviceValue(
                          device.id,
                          "hoursPerDay",
                          Math.min(24, userChoice.hoursPerDay + 1),
                        )
                      }
                      className="w-7 h-7 rounded bg-gray-50 flex items-center justify-center text-sm font-bold hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-6 bg-green-50 rounded-2xl border border-green-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h4 className="text-sm font-bold text-green-800">
            실시간 예상 총 부하량
          </h4>
          <p className="text-xs text-green-600 mt-0.5">
            ※ 피크 전력 및 안전 마진 전력 20%가 자동으로 계산에 포함됩니다.
          </p>
        </div>
        <div className="text-right self-end sm:self-center">
          <span className="text-xs text-gray-500 block">추천 배터리 사양</span>
          <strong className="text-2xl font-black text-green-700">
            {totals.recommendedBatteryKw} kWh
          </strong>
        </div>
      </div>
    </div>
  );
}
