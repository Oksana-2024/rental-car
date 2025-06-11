import { ICarCard } from "@/types/car";
import CarCard from "./car-card";
export interface ICarList {
  carItems: ICarCard[];
}
export default function CarList({ carItems }: ICarList) {
  return (
    <ul className="grid grid-cols-4 gap-y-[48px] gap-x-[32px]">
      {carItems.map((car, index) => (
        <li key={car.id}>
          <CarCard {...car} priority={index === 0} />
        </li>
      ))}
    </ul>
  );
}
