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

  // async function fetchCars(search: ISearchQuery = {} as ISearchQuery) {
  //   try {
  //     setIsLoading(true);
  //     setError("");

  //     const params = new URLSearchParams();
  //     Object.entries(search).forEach(([key, value]) => {
  //       if (value !== undefined && value !== null && value !== "") {
  //         params.append(key, String(value));
  //       }
  //     });

  //     const { data } = await BASE_API.get("/cars", {
  //       params,
  //     });

  //     if (search.page && search.page > 1) {
  //       setCars((prev) => [...prev, ...data.cars]);
  //     } else {
  //       setCars(data.cars);
  //     }

  //     setPage(Number(data.page));
  //     setTotalPages(data.totalPages);
  //   } catch (error) {
  //     setError((error as Error).message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // const onSubmit = (search: ISearchQuery) => {
  //   setPage(1);
  //   setQuery(search);
  //   fetchCars({ ...search, page: 1 });
  // };

  // const handleClick = () => {
  //   const nextPage = page + 1;
  //   setPage(nextPage);
  // };

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
    <section className="pt-[84px]">
      <Container>
        <SearchForm onSubmit={onSubmit} />
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}

        <CarList carItems={cars} />

        {isLoading ? (
          <p>Loading, please wait...</p>
        ) : (
          <>
            {totalPages > page && (
              <Button
                className="border-solid border rounded-xl border-button-500"
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
