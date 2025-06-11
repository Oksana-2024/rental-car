import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { schemaFeedbackForm } from "@/utils/schema-feedback-form";
import BookingDatePicker from "./date-picker";
import Button from "./button";
import { useState } from "react";

export default function FeedbackForm() {
  const [range, setRange] = useState<Date[]>([]);
  const [startDate, endDate] = range;

  const onChange = (update: (Date | null)[]) => setRange(update as never);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: "", email: "", comment: "", date: undefined },
    resolver: zodResolver(schemaFeedbackForm),
  });
  return (
    <div className="flex flex-col w-auto p-8 rounded-xl border bopder-inputs">
      <h3 className="font-semibold text-xl leading-tight mb-2">
        Book your car now
      </h3>
      <p className="text-sm text-oslo-grey-500 font-medium mb-6">
        Stay connected! We are always ready to help you.
      </p>
      <form
        className="flex flex-col justify-center"
        onSubmit={handleSubmit((values) => {
          toast.success("Your booking request has been sent successfully.");
          const formData = {
            ...values,
            date: range,
          };

          console.log("formData", formData);

          reset();
        })}
      >
        <input
          {...register("name")}
          placeholder="Name*"
          className="bg-inputs py-3.5 px-5 rounded-xl text-base placeholder:text-oslo-grey-500 h-12"
        />
        <div className="h-3 mb-1">
          {errors.name?.message && (
            <p className="text-red-400 text-xs font-normal">
              {errors.name?.message}
            </p>
          )}
        </div>
        <input
          className="bg-inputs py-3.5 px-5 rounded-xl text-base placeholder:text-oslo-grey-500 h-12"
          {...register("email")}
          type="email"
          placeholder="Email*"
        />
        <div className="h-3 mb-1">
          {errors.email?.message && (
            <p className="text-red-400 text-xs font-normal">
              {errors.email?.message}
            </p>
          )}
        </div>

        <div className="mb-4 bg-inputs py-3.5 px-5 rounded-xl text-base placeholder:text-oslo-grey-500 h-12 focus-visible:border-button-500">
          <Controller
            name="date"
            control={control}
            render={({}) => (
              <BookingDatePicker
                startDate={startDate}
                endDate={endDate}
                onChange={onChange}
              />
            )}
          />
        </div>

        <textarea
          className="resize mb-20 h-[88px] bg-inputs py-3.5 px-5 rounded-xl text-base placeholder:text-oslo-grey-500"
          name="comment"
          placeholder="Comment"
        ></textarea>
        <Button
          className="bg-blue-600 text-white w-[156px] h-[44px] rounded-xl hover:bg-button-hover-500 ml-auto mr-auto"
          type="submit"
          text="Send"
        />
      </form>
    </div>
  );
}
