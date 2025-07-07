import { use } from "react";
import CarById from "./car-details-by-id";

export interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
const CarByIdPage = ({ params }: PageProps) => {
  const p = use(params);
  return <CarById id={p.id} />;
};
export default CarByIdPage;
