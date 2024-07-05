export interface IOption {
  value: string;
  label: string;
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
}

export enum Sort {
  descendingLabel = "Market cap descending",
  ascendingLabel = "Market cap ascending",
  descendingValue = "market_cap_desc",
  ascendingValue = "market_cap_asc",
}

export interface DataType {
  [key: string]: string | number | null;
}
