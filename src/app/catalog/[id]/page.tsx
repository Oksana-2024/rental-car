import { use } from "react";
import CarById from "./car-details-by-id";

interface IPageProps {
  params: Promise<{ id: string }>;
}

const CarByIdPage = ({ params }: IPageProps) => {
  const id = use(params).id;
  return <CarById id={id} />;
};
export default CarByIdPage;
