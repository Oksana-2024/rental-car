"use client";

import { Controller, useForm } from "react-hook-form";

import SelectForm from "./select";
import { useEffect, useState } from "react";

import { ISearchQuery } from "@/types/car";
import { BASE_API } from "../../../service/baseAPI";
import { formatWithCommas, removeNonDigits } from "@/utils/formatMileage";
import Button from "./button";

export interface ISearchForm {
  onSubmit: (search: ISearchQuery) => void;
}
const SearchForm = ({ onSubmit }: ISearchForm) => {
  const [brands, setBrands] = useState<string[]>([]);

  const prices = Array.from({ length: 40 }, (_, index) =>
    ((index + 3) * 10).toString()
  );

  async function fetchBrands() {
    try {
      const res = await BASE_API.get<string[]>("/brands");
      setBrands(res.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

  const brandsOptions = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  const priceOptions = prices.map((price) => ({ value: price, label: price }));
  useEffect(() => {
    fetchBrands();
  }, []);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      brand: "",
      rentalPrice: "",
      minMileage: "",
      maxMileage: "",
    },
  });

  return (
    <form
      className="flex flex-row gap-[16px] items-end mb-14"
      onSubmit={handleSubmit((values) => {
        onSubmit({
          ...values,
          rentalPrice: (Number(values.rentalPrice) as never) || "",
          brand: values.brand || "",
        });
      })}
    >
      <Controller
        name="brand"
        control={control}
        render={({ field }) => (
          <SelectForm
            selectId="brand"
            label="Car brand"
            placeholder="Choose brand"
            selectName="brand"
            selectOptions={brandsOptions}
            {...field}
            value={
              brandsOptions.find((option) => option.value === field.value) ||
              null
            }
            onChange={(option) => field.onChange(option ? option.value : null)}
          />
        )}
      />
      <Controller
        control={control}
        name="rentalPrice"
        render={({ field }) => (
          <SelectForm
            prefix="to $"
            selectId="rentalPrice"
            label="Price/ 1 hour"
            placeholder="Choose price"
            selectName="rentalPrice"
            selectOptions={priceOptions}
            {...field}
            value={
              priceOptions.find((option) => option.value === field.value) ||
              null
            }
            onChange={(option) => field.onChange(option ? option.value : null)}
          />
        )}
      />
      <div className="flex flex-col gap-1">
        <label
          className="text-xs font-normal text-oslo-grey-500"
          htmlFor="mileage"
        >
          Сar mileage / km
        </label>
        <div className="relative">
          <span className="text-base font-medium text-mirage-500 leading-3 absolute top-4 left-6">
            From
          </span>
          <Controller
            name="minMileage"
            control={control}
            render={({ field: { onChange, value, ref, ...rest } }) => (
              <input
                {...rest}
                ref={ref}
                value={formatWithCommas(value)}
                onChange={(e) => {
                  const raw = removeNonDigits(e.target.value);
                  onChange(raw);
                }}
                className="w-[204px] h-[44px] rounded-l-xl outline-none bg-inputs border-r border-gray-light pt-3 pb-3 pr-3 pl-[64px]"
                id="mileage"
              />
            )}
          />
          <span className="text-base font-medium text-mirage-500 absolute top-4 right-40 leading-3">
            To
          </span>
          <Controller
            name="maxMileage"
            control={control}
            render={({ field: { onChange, value, ref, ...rest } }) => (
              <input
                {...rest}
                ref={ref}
                value={formatWithCommas(value)}
                onChange={(e) => {
                  const raw = removeNonDigits(e.target.value);
                  onChange(raw);
                }}
                className="rounded-r-xl w-[204px] h-[44px] outline-none bg-inputs pt-3 pb-3 pl-12 pr-3"
              />
            )}
          />
        </div>
      </div>
      <Button
        text="Search"
        type="submit"
        className="bg-blue-600 text-white w-[156px] h-[44px] rounded-xl hover:bg-button-hover-500"
      />
    </form>
  );
};

export default SearchForm;
