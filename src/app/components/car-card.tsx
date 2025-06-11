"use client";
import Image from "next/image";
import { ICarCard } from "@/types/car";
import { formatMileage } from "@/utils/formatMileage";

import Button from "./button";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/classNameMerge";
import {
  getDataLocalStorage,
  setDataToLocalStorage,
} from "../../../service/local-storage-api";

export default function CarCard({
  year,
  brand,
  model,
  type,
  img,
  description,
  rentalPrice,
  rentalCompany,
  address,
  mileage,
  priority,
  id,
}: ICarCard & { priority: boolean }) {
  const router = useRouter();
  const addressItems = address?.split(", ").slice(-2);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getDataLocalStorage<string[]>("like") || [];
    if (favorites.includes(id)) {
      setIsFavorite(true);
    }
  }, [id]);

  const handleClick = () => {
    const favorites = getDataLocalStorage<string[]>("like") || [];
    if (isFavorite) {
      setIsFavorite(false);
      setDataToLocalStorage(
        "like",
        favorites.filter((item) => item !== id)
      );
    } else {
      setIsFavorite(true);
      favorites.push(id);
      setDataToLocalStorage("like", favorites);
    }
  };
  return (
    <>
      <div className="w-auto mb-4 relative">
        <Image
          src={img}
          alt={description}
          width={276}
          height={268}
          className="h-[268px] rounded-[14px]"
          loading={(!priority && "lazy") || undefined}
          priority={priority}
        />
        <button
          type="button"
          className="border-none bg-transparent"
          onClick={handleClick}
        >
          <Heart
            size={18}
            className={cn(
              "absolute top-4 right-4",
              isFavorite ? "fill-button-500 stroke-button-500" : "stroke-white"
            )}
          />
        </button>
      </div>
      <div className="flex flex-row justify-between mb-2">
        <h3 className="text-base font-medium leading-[1.5] truncate ">
          {brand} <span className="text-button-500">{model},</span> {year}
        </h3>
        <h3>${rentalPrice}</h3>
      </div>
      <div className="font-normal text-xs leading-[1.33] mb-7 text-oslo-grey-500">
        {addressItems?.map((item) => (
          <span
            className="after:content-['|'] after:mr-1.5 after:ml-1.5"
            key={item}
          >
            {item}
          </span>
        ))}
        <span className="after:content-['|'] after:mr-1.5 after:ml-1.5">
          {rentalCompany}
        </span>
        <span className="after:content-['|'] after:mr-1.5 after:ml-1.5">
          {type}
        </span>
        <span>{formatMileage(mileage)}</span>
      </div>
      <Button
        className="rounded-[14px] text-base leading-[1.25] font-semibold w-[276px] h-[44px] bg-button-500 hover:bg-button-hover-500 text-white"
        text="Read more"
        type="button"
        onClick={() => router.push(`/catalog/${id}`)}
      />
    </>
  );
}
