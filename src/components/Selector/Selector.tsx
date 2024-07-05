import { Select } from "antd";
import { IOption } from "../../types/interfaces";

interface SelectorProps<T> {
  defaultValue: T;
  onChangeCurrency: (value: T) => void;
  options: IOption[];
}

const Selector = <T extends string>({
  defaultValue,
  onChangeCurrency,
  options,
}: SelectorProps<T>) => {
  return (
    <Select
      options={options}
      onChange={onChangeCurrency}
      defaultValue={defaultValue}
      style={{ width: "200px" }}
    />
  );
};

export default Selector;
