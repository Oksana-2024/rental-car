export interface ICarCard {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
  fuelConsumption: number;
  engineSize: string;
}

export interface ISearchQuery {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
  page?: number;
}
