import CarById from "./car-details-by-id";

interface IPageProps {
  params: { id: string };
}

const CarByIdPage = ({ params }: IPageProps) => {
  return <CarById id={params.id} />;
};
export default CarByIdPage;
