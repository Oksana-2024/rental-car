import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale/en-GB";
import "./date-picker.css";

registerLocale("en-GB", enGB);

interface IBookingDatePicker {
  startDate: Date;
  endDate: Date;
  onChange: (select: (Date | null)[]) => void;
}
export default function BookingDatePicker({
  startDate,
  endDate,
  onChange,
}: IBookingDatePicker) {
  return (
    <>
      <DatePicker
        className="bg-inputs text-base outline-none w-full"
        wrapperClassName="w-full"
        locale="en-GB"
        minDate={new Date()}
        dateFormat="dd.MM.yyyy"
        placeholderText="Booking date"
        onChange={onChange}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        selectsRange
      />
    </>
  );
}
