import { Metadata } from "next";
import RentalFormSPA from "@/components/RentalFormSPA";

export const metadata: Metadata = {
  title: "전국 축제·행사 배터리 렌탈 1위 | IseoRental",
  description: "기획사를 위한 스마트 전력 계산기 및 실시간 PDF 견적서 발행.",
};

export default function HomePage() {
  return (
    <main>
      <RentalFormSPA />
    </main>
  );
}
