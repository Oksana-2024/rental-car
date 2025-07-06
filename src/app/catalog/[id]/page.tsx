import CarById from "./car-details-by-id";


const CarByIdPage = ({ params }: { params: { id: string } }) => {
  return <CarById id={params.id} />;
};
export default CarByIdPage;
