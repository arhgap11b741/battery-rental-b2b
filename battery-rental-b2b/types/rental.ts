export interface RentalInput {
  deviceCount: number;
  durationDays: number;
  selectedOptions: string[];
}

export interface BatteryOption {
  id: string;
  name: string;
  capacity: number; // kWh
  price: number;
}
