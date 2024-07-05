import axios from "axios";

axios.defaults.baseURL = "https://api.coingecko.com/api/v3/coins/";

export const getCryptoRate = async (
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

export const getSearchedCoins = async (coinName: string, currency: string) => {
  const { data } = await axios.get(
    `markets?vs_currency=${currency}&ids=${coinName}`
  );
  return data;
};
