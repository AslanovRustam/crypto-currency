import type { Dispatch, FC, SetStateAction } from "react";
import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import styles from "../../styles/search.module.css";

interface SearchComponentProps {
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const { Search } = Input;

const SearchComponent: FC<SearchComponentProps> = ({ setSearchValue }) => {
  const onSearch: SearchProps["onSearch"] = (value) =>
    setSearchValue(value.toLowerCase());

  return (
    <Search
      placeholder="Exact coin id"
      allowClear
      enterButton="Search"
      className={styles.search}
      onSearch={onSearch}
    />
  );
};

export default SearchComponent;
