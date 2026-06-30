// 계산기에서 선택할 수 있는 표준 기기 타입
export interface DeviceOption {
  id: string;
  name: string;
  defaultPower: number; // 표준 소비전력 (W 단위, 예: 렌탈용 냉장고 500W)
  category: "음향/영상" | "조명" | "식음료" | "기타";
}

// 사용자가 입력한 기기별 수량 및 시간 상태 타입
export interface SelectedDevice {
  deviceId: string;
  count: number; // 수량 (대)
  hoursPerDay: number; // 하루 사용 시간 (시간)
}

// 1단계 전력 계산기 결과 데이터 타입
export interface CalculatorResult {
  totalPowerW: number; // 총 소비전력 합계 (W)
  totalEnergyWh: number; // 하루 총 필요 에너지량 (Wh)
  recommendedBatteryKw: number; // 추천할 배터리 용량 (kWh, 마진 고려)
}
