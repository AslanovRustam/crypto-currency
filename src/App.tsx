import "modern-normalize/modern-normalize.css";
import {
  FC,
  useEffect,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { Flex, Alert, Table, Image, Typography, Input, Select } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import Column from "antd/es/table/Column";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeLightInit } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import defaultImage from "./assets/no-image.png";

const { Search } = Input;
const { Text } = Typography;

export interface IOption {
  value: string;
  label: string;
}

enum Currency {
  USD = "USD",
  EUR = "EUR",
}

enum Sort {
  descendingLabel = "Market cap descending",
  ascendingLabel = "Market cap ascending",
  descendingValue = "market_cap_desc",
  ascendingValue = "market_cap_asc",
}

const optionsCurrency = [
  { value: Currency.USD, label: Currency.USD },
  { value: Currency.EUR, label: Currency.EUR },
];

const optionsSort = [
  { value: Sort.descendingValue, label: Sort.descendingLabel },
  { value: Sort.ascendingValue, label: Sort.ascendingLabel },
];

interface DataType {
  [key: string]: string | number | null;
}

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

interface SearchComponentProps {
  setSearchValue: Dispatch<SetStateAction<string>>;
}

interface SelectorProps<T> {
  defaultValue: T;
  onChangeCurrency: (value: T) => void;
  options: IOption[];
}

interface TableSectionProps {
  data: DataType[];
  currency: string;
  loading: boolean;
  onChangePage: (value: number, pageSize: number) => void;
  total: number;
}

export const appCode = `
import "modern-normalize/modern-normalize.css";
import {
  FC,
  useEffect,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { Flex, Alert, Table, Image, Typography, Input, Select } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import Column from "antd/es/table/Column";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeLightInit } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import defaultImage from "./assets/no-image.png";

const { Search } = Input;
const { Text } = Typography;

export interface IOption {
  value: string;
  label: string;
}

enum Currency {
  USD = "USD",
  EUR = "EUR",
}

enum Sort {
  descendingLabel = "Market cap descending",
  ascendingLabel = "Market cap ascending",
  descendingValue = "market_cap_desc",
  ascendingValue = "market_cap_asc",
}

const optionsCurrency = [
  { value: Currency.USD, label: Currency.USD },
  { value: Currency.EUR, label: Currency.EUR },
];

const optionsSort = [
  { value: Sort.descendingValue, label: Sort.descendingLabel },
  { value: Sort.ascendingValue, label: Sort.ascendingLabel },
];

interface DataType {
  [key: string]: string | number | null;
}

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

interface SearchComponentProps {
  setSearchValue: Dispatch<SetStateAction<string>>;
}

interface SelectorProps<T> {
  defaultValue: T;
  onChangeCurrency: (value: T) => void;
  options: IOption[];
}

interface TableSectionProps {
  data: DataType[];
  currency: string;
  loading: boolean;
  onChangePage: (value: number, pageSize: number) => void;
  total: number;
}

axios.defaults.baseURL = "https://api.coingecko.com/api/v3/coins/";

const getCryptoRate = async (
  currency: string,
  order: string,
  page: number,
  perPage: number
) => {
  const { data } = await axios.get(
    \`markets?vs_currency=\${currency}&order=\${order}&per_page=\${perPage}&page=\${page}&sparkline=false\`
  );
  return data;
};

const getSearchedCoins = async (coinName: string, currency: string) => {
  const { data } = await axios.get(
    \`markets?vs_currency=\${currency}&ids=\${coinName}\`
  );
  return data;
};

const getCurrentClass = (value: any): "success" | "danger" | "warning" => {
  const currentPrice = Number(value);

  if (isNaN(currentPrice)) {
    return "warning";
  }

  return currentPrice > 0 ? "success" : currentPrice < 0 ? "danger" : "warning";
};

const CodeEditor: FC<CodeEditorProps> = ({ value, onChange }) => {
  return (
    <CodeMirror
      value={value}
      height="1000px"
      theme={vscodeLightInit({
        settings: {
          caret: "#c6c6c6",
          fontFamily: "monospace",
        },
      })}
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
};

const SearchComponent: FC<SearchComponentProps> = ({ setSearchValue }) => {
  const onSearch: SearchProps["onSearch"] = (value) =>
    setSearchValue(value.toLowerCase());

  return (
    <Search
      placeholder="Exact coin id"
      allowClear
      enterButton="Search"
      className="search"
      onSearch={onSearch}
    />
  );
};

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
      className="select"
    />
  );
};

const TableSection: FC<TableSectionProps> = ({
  data,
  currency,
  loading,
  onChangePage,
  total,
}) => {
  return (
    <Table
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={{
        total: total,
        pageSizeOptions: [5, 10, 20, 50, 100],
        onChange: onChangePage,
      }}
    >
      <Column key="id" title="ID" dataIndex="id" className="columnSmall" />
      <Column
        key="name"
        title="Name"
        render={(record: DataType) => (
          <Flex gap="16px" align="center" className="flexContainer">
            <Image
              src={
                typeof record.image === "string" ? record.image : defaultImage
              }
              alt={typeof record.name === "string" ? record.name : "unknown"}
              width={32}
            />
            <Text>{record.name}</Text>
          </Flex>
        )}
        className="column"
      />
      <Column
        key="current_price"
        title="Current Price"
        render={(record: DataType) => (
          <Flex gap="4px" className="flexContainer">
            <Text>{record.current_price}</Text>
            <Text>{currency.toLowerCase()}</Text>
          </Flex>
        )}
        className="column"
      />
      <Column
        key="price_change_24h"
        title={\`24h \${currency} change\`}
        render={(record: DataType) => (
          <Text type={getCurrentClass(record.price_change_24h)}>
            {Number(record.price_change_24h).toFixed(4)}
          </Text>
        )}
        className="column"
      />
      <Column
        key="price_change_percentage_24h"
        title="24h % change"
        render={(record: DataType) => (
          <Text type={getCurrentClass(record.price_change_percentage_24h)}>
            {Number(record.price_change_percentage_24h).toFixed(4)}
          </Text>
        )}
        className="column"
      />
    </Table>
  );
};

function App() {
  const [currency, setCurrency] = useState<Currency>(Currency.USD);
  const [sorting, setsorting] = useState<Sort>(Sort.descendingValue);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currencyData, setCurrencyData] = useState<DataType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [code, setCode] = useState(appCode);

  useEffect(() => {
    setLoading(true);

    const getRate = async () => {
      try {
        if (searchValue) {
          const data = await getSearchedCoins(searchValue, currency);
          setCurrencyData(data);
          setError(null);
          return;
        }
        const data = await getCryptoRate(currency, sorting, page, perPage);
        setCurrencyData(data);
        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };
    getRate();
  }, [currency, sorting, page, perPage, searchValue]);

  const memoizedOptionsCurrency = useMemo(() => optionsCurrency, []);
  const memoizedOptionsSort = useMemo(() => optionsSort, []);

  const onChangeCurrency = (value: Currency) => {
    setCurrency(value);
  };

  const onChangeSort = (value: Sort) => {
    setsorting(value);
  };

  const onChangePage = (value: number, pageSize: number) => {
    setPage(value);
    setPerPage(pageSize);
  };

  return (
    <Flex vertical gap="24px">
      <Text style={{ fontSize: "24px" }}>Coins & Markets</Text>
      {error && (
        <Alert message={\`Something went wrong, \${error}\`} type="error" />
      )}
      <Flex gap="24px" className="filters">
        <Selector
          defaultValue={currency}
          onChangeCurrency={onChangeCurrency}
          options={memoizedOptionsCurrency}
        />
        <Selector
          defaultValue={sorting}
          onChangeCurrency={onChangeSort}
          options={memoizedOptionsSort}
        />
        <SearchComponent setSearchValue={setSearchValue} />
      </Flex>
      {currencyData.length > 0 ? (
        <TableSection
          data={currencyData}
          currency={currency}
          loading={loading}
          onChangePage={onChangePage}
          total={searchValue ? 0 : 1000}
        />
      ) : (
        <Text style={{ fontSize: "36px" }}>No coins to display</Text>
      )}
      <Text style={{ fontSize: "24px" }}>App source code</Text>
      <CodeEditor value={code} onChange={setCode} />
    </Flex>
  );
}

export default App;

`;

axios.defaults.baseURL = "https://api.coingecko.com/api/v3/coins/";

const getCryptoRate = async (
  currency: string,
  order: string,
  page: number,
  perPage: number
) => {
  const { data } = await axios.get(
    `markets?vs_currency=${currency}&order=${order}&per_page=${perPage}&page=${page}&sparkline=false`
  );
  return data;
};

const getSearchedCoins = async (coinName: string, currency: string) => {
  const { data } = await axios.get(
    `markets?vs_currency=${currency}&ids=${coinName}`
  );
  return data;
};

const getCurrentClass = (value: any): "success" | "danger" | "warning" => {
  const currentPrice = Number(value);

  if (isNaN(currentPrice)) {
    return "warning";
  }

  return currentPrice > 0 ? "success" : currentPrice < 0 ? "danger" : "warning";
};

const CodeEditor: FC<CodeEditorProps> = ({ value, onChange }) => {
  return (
    <CodeMirror
      value={value}
      height="1000px"
      theme={vscodeLightInit({
        settings: {
          caret: "#c6c6c6",
          fontFamily: "monospace",
        },
      })}
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
};

const SearchComponent: FC<SearchComponentProps> = ({ setSearchValue }) => {
  const onSearch: SearchProps["onSearch"] = (value) =>
    setSearchValue(value.toLowerCase());

  return (
    <Search
      placeholder="Exact coin id"
      allowClear
      enterButton="Search"
      className="search"
      onSearch={onSearch}
    />
  );
};

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
      className="select"
    />
  );
};

const TableSection: FC<TableSectionProps> = ({
  data,
  currency,
  loading,
  onChangePage,
  total,
}) => {
  return (
    <Table
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={{
        total: total,
        pageSizeOptions: [5, 10, 20, 50, 100],
        onChange: onChangePage,
      }}
    >
      <Column key="id" title="ID" dataIndex="id" className="columnSmall" />
      <Column
        key="name"
        title="Name"
        render={(record: DataType) => (
          <Flex gap="16px" align="center" className="flexContainer">
            <Image
              src={
                typeof record.image === "string" ? record.image : defaultImage
              }
              alt={typeof record.name === "string" ? record.name : "unknown"}
              width={32}
            />
            <Text>{record.name}</Text>
          </Flex>
        )}
        className="column"
      />
      <Column
        key="current_price"
        title="Current Price"
        render={(record: DataType) => (
          <Flex gap="4px" className="flexContainer">
            <Text>{record.current_price}</Text>
            <Text>{currency.toLowerCase()}</Text>
          </Flex>
        )}
        className="column"
      />
      <Column
        key="price_change_24h"
        title={`24h ${currency} change`}
        render={(record: DataType) => (
          <Text type={getCurrentClass(record.price_change_24h)}>
            {Number(record.price_change_24h).toFixed(4)}
          </Text>
        )}
        className="column"
      />
      <Column
        key="price_change_percentage_24h"
        title="24h % change"
        render={(record: DataType) => (
          <Text type={getCurrentClass(record.price_change_percentage_24h)}>
            {Number(record.price_change_percentage_24h).toFixed(4)}
          </Text>
        )}
        className="column"
      />
    </Table>
  );
};

function App() {
  const [currency, setCurrency] = useState<Currency>(Currency.USD);
  const [sorting, setsorting] = useState<Sort>(Sort.descendingValue);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currencyData, setCurrencyData] = useState<DataType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [code, setCode] = useState(appCode);

  useEffect(() => {
    setLoading(true);

    const getRate = async () => {
      try {
        if (searchValue) {
          const data = await getSearchedCoins(searchValue, currency);
          setCurrencyData(data);
          setError(null);
          return;
        }
        const data = await getCryptoRate(currency, sorting, page, perPage);
        setCurrencyData(data);
        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };
    getRate();
  }, [currency, sorting, page, perPage, searchValue]);

  const memoizedOptionsCurrency = useMemo(() => optionsCurrency, []);
  const memoizedOptionsSort = useMemo(() => optionsSort, []);

  const onChangeCurrency = (value: Currency) => {
    setCurrency(value);
  };

  const onChangeSort = (value: Sort) => {
    setsorting(value);
  };

  const onChangePage = (value: number, pageSize: number) => {
    setPage(value);
    setPerPage(pageSize);
  };

  return (
    <Flex vertical gap="24px">
      <Text style={{ fontSize: "24px" }}>Coins & Markets</Text>
      {error && (
        <Alert message={`Something went wrong, ${error}`} type="error" />
      )}
      <Flex gap="24px" className="filters">
        <Selector
          defaultValue={currency}
          onChangeCurrency={onChangeCurrency}
          options={memoizedOptionsCurrency}
        />
        <Selector
          defaultValue={sorting}
          onChangeCurrency={onChangeSort}
          options={memoizedOptionsSort}
        />
        <SearchComponent setSearchValue={setSearchValue} />
      </Flex>
      {currencyData.length > 0 ? (
        <TableSection
          data={currencyData}
          currency={currency}
          loading={loading}
          onChangePage={onChangePage}
          total={searchValue ? 0 : 1000}
        />
      ) : (
        <Text style={{ fontSize: "36px" }}>No coins to display</Text>
      )}
      <Text style={{ fontSize: "24px" }}>App source code</Text>
      <CodeEditor value={code} onChange={setCode} />
    </Flex>
  );
}

export default App;
