"use client";

import { useEffect, useState } from "react";
import { BASE_API } from "../../../service/baseAPI";
import { ICarCard, ISearchQuery } from "@/types/car";
import Container from "../components/container";
import SearchForm from "../components/search-form";
import CarList from "../components/car-list";
import Button from "../components/button";

const CatalogPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cars, setCars] = useState<ICarCard[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState<ISearchQuery>({} as ISearchQuery);

  
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        setError("");

        const params = new URLSearchParams();
        Object.entries({ ...query, page }).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.append(key, String(value));
          }
        });

        const { data } = await BASE_API.get("/cars", { params });

        if (page > 1) {
          setCars((prev) => [...prev, ...data.cars]);
        } else {
          setCars(data.cars);
        }

        setTotalPages(data.totalPages);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [query, page]);

  const onSubmit = (search: ISearchQuery) => {
    setCars([]); // очищаємо при новому пошуку
    setPage(1);
    setQuery(search); // новий пошук запускає useEffect
  };

  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <section className="pt-[84px] pb-[124px]">
      <Container className="flex flex-col items-center">
        <SearchForm onSubmit={onSubmit} />
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}

        <CarList carItems={cars} />

        {isLoading ? (
          <p>Loading, please wait...</p>
        ) : (
          <>
            {totalPages > page && (
              <Button
                className="justify-center flex w-[156px] h-[44] items-center border-solid border rounded-xl border-button-500 mt-20 hover:border-button-hover-500"
                text="Load more"
                type="button"
                onClick={handleClick}
              />
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default CatalogPage;
