import Select, {
  components,
  SingleValueProps,
  ActionMeta,
  SingleValue,
} from "react-select";
import "@components/select.css";

type OptionType = { label: string | number; value: string | number };

interface ISelectForm {
  selectName: string;
  placeholder: string;
  selectId: string;
  selectOptions: { label: string; value: string }[];
  label: string;
  value?: OptionType | null;
  onChange?: (
    value: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;
  prefix?: string;
}

const SelectForm = ({
  selectName,
  selectOptions,
  selectId,
  placeholder,
  label,
  prefix,
  value,
  onChange,
}: ISelectForm) => {
  const createSingleValueWithPrefix = (prefix: string) => {
    const CustomSingleValue = (props: SingleValueProps<OptionType, false>) => (
      <components.SingleValue {...props}>
        {prefix}
        {props.data.label}
      </components.SingleValue>
    );

    CustomSingleValue.displayName = "CustomSingleValueWithPrefix";
    return CustomSingleValue;
  };
  const componentsOverride = prefix
    ? { SingleValue: createSingleValueWithPrefix(prefix) }
    : undefined;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={selectName}
        className="text-xs font-normal text-oslo-grey-500"
      >
        {label}
      </label>

      <Select
        className={"basic-single"}
        classNamePrefix="select"
        inputId={selectId}
        isClearable
        isSearchable
        name={selectName}
        options={selectOptions}
        instanceId={selectId}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        components={componentsOverride}
/*         closeMenuOnScroll={false}
        closeMenuOnSelect={false}
        menuIsOpen={true} */
      />
    </div>
  );
};

export default SelectForm;
