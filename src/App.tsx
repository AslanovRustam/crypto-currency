import "modern-normalize/modern-normalize.css";
import { useEffect, useMemo, useState } from "react";
import { Flex, Alert, Layout } from "antd";
import Selector from "./components/Selector/Selector";
import TitleSection from "./components/TitleSection/TitleSection";
import TableSection from "./components/TableSection/TableSection";
import { getCryptoRate, getSearchedCoins } from "./services/apiCoingecko";
import CodeEditor from "./components/Codeeditor/Codeeditor";
import SearchComponent from "./components/Search/Search";
import { Currency, DataType, Sort } from "./types/interfaces";
import { appCode, optionsCurrency, optionsSort } from "./data/data";
import styles from "./styles/app.module.css";

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
      <TitleSection text="Coins & Markets" size="24px" />
      {error && (
        <Alert message={`Something went wrong, ${error}`} type="error" />
      )}
      <Flex gap="24px" className={styles.filters}>
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
        <TitleSection text="No coins to display" size="36px" />
      )}
      <TitleSection text="App source code" size="24px" />
      <CodeEditor value={code} onChange={setCode} />
    </Flex>
  );
}

export default App;
