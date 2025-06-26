
import Image from "next/image";
import { ICarCard } from "@/types/car";
import { use, useEffect, useState } from "react";
import { BASE_API } from "../../../../service/baseAPI";
import Container from "@/app/components/container";
import FeedbackForm from "@/app/components/feedback-form";
import { formatMileage } from "@/utils/formatMileage";
import {
  CalendarRange,
  CarFront,
  CircleCheck,
  Fuel,
  MapPin,
  Settings,
} from "lucide-react";
import { ToastContainer } from "react-toastify";

interface ICarByIdPage {
  params: Promise<{ id: string }>;
}

const CarByIdPage = ({ params }: ICarByIdPage) => {
  const [car, setCar] = useState<ICarCard>();
  const [isLoading, setIsLoading] = useState(true);
  const id = use(params);
  const cardId = id.id;
  const addressItems = car?.address?.split(", ").slice(-2);

  async function fetchCarById(id: string) {
    try {
      setIsLoading(true);
      const { data } = await BASE_API.get(`/cars/${id}`);
      if (!data) {
        throw new Error(`Failed to fetch car with id ${id}`);
      }
      setCar(data);
    } catch (error) {
      console.error("Error fetching car:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (cardId) fetchCarById(cardId);
  }, [cardId]);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (!car) return <p>Car not found.</p>;

  return (
    <section className="pt-[84px] pb-[104px]">
      <Container>
        <div className="flex flex-row gap-[72px] ">
          <div className="flex flex-col gap-10 max-w-[640px]">
            <Image
              className="rounded-[14px] h-[512px] w-[640px]"
              src={car?.img}
              alt={car?.description}
              width={640}
              height={512}
            />
            <FeedbackForm />
          </div>

          <div className="w-[488px] pt-5">
            <h3 className="font-semibold text-2xl leading-custom mb-2">
              {car?.brand}, {car?.year}
            </h3>
            <p className="font-medium text-base text-oslo-grey-500 mb-2">
              id: {car?.id}
            </p>
            <div className="flex flex-row gap-4 mb-4 font-medium text-base leading-tight">
              <div className="flex flex-row gap-1 items-center">
                <MapPin size={16} />
                {addressItems?.map((item, index) => (
                  <span key={index}>
                    {item}
                    {index < addressItems.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
              <span>Mileage: {formatMileage(car?.mileage)}</span>
            </div>
            <p className="text-button-500 font-semibold text-2xl leading-custom mb-8">
              ${car?.rentalPrice}
            </p>
            <p className="font-medium text-base leading-tight mb-[68px]">
              {car?.description}
            </p>

            <div className="flex flex-col gap-[110px] font-medium text-base leading-tight">
              <div className="flex flex-col gap-5">
                <h3 className="font-semibold text-xl leading-tight">
                  Rental Conditions:
                </h3>
                <ul className="flex flex-col gap-4">
                  {car?.rentalConditions.map((item, index) => (
                    <li
                      className="flex flex-row gap-1 items-center"
                      key={index}
                    >
                      <CircleCheck size={16} />
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-5">
                <h3 className="font-semibold text-xl leading-tight">
                  Car Specifications:
                </h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex flex-row gap-1 items-center">
                    <CalendarRange size={16} /> <p>Year: {car?.year}</p>
                  </li>
                  <li className="flex flex-row gap-1 items-center">
                    <CarFront size={16} />
                    <p>Type: {car?.type}</p>
                  </li>
                  <li className="flex flex-row gap-1 items-center">
                    <Fuel size={16} />
                    <p>Fuel Consumption: {car?.fuelConsumption}</p>
                  </li>
                  <li className="flex flex-row gap-1 items-center">
                    <Settings size={16} />
                    <p>Engine Size: {car?.engineSize}</p>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-5">
                <h3 className="font-semibold text-xl leading-tight">
                  Accessories and functionalities:
                </h3>
                <ul className="flex flex-col gap-4">
                  {car?.accessories
                    .concat(car?.functionalities)
                    .map((item, index) => (
                      <li
                        className="flex flex-row gap-1 items-center"
                        key={index}
                      >
                        <CircleCheck size={16} />
                        <p>{item}</p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer position="top-center" />
    </section>
  );
};

export default CarByIdPage;
