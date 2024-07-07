import { Select } from "antd";
import { IOption } from "../../types/interfaces";
import styles from "../../styles/selector.module.css";

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
      className={styles.select}
    />
  );
};

export default Selector;
