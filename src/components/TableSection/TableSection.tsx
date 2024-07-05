import { type FC } from "react";
import { Flex, Table, Image } from "antd";
import Column from "antd/es/table/Column";
import TitleSection from "../TitleSection/TitleSection";
import { DataType } from "../../types/interfaces";
import defaultImage from "../../assets/no-image.png";

interface TableSectionProps {
  data: DataType[];
  currency: string;
  loading: boolean;
  onChangePage: (value: number, pageSize: number) => void;
  total: number;
}

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
      <Column
        key="name"
        title="Name"
        render={(record: DataType) => (
          <Flex gap="16px" align="center">
            <Image
              src={
                typeof record.image === "string" ? record.image : defaultImage
              }
              alt={typeof record.name === "string" ? record.name : "unknown"}
              width={32}
            />

            <TitleSection
              text={typeof record.name === "string" ? record.name : "unknown"}
            />
          </Flex>
        )}
      />
      <Column
        key="current_price"
        title="Current Price"
        render={(record: DataType) => (
          <Flex gap="4px">
            <TitleSection text={record.current_price} />
            <TitleSection text={currency.toLowerCase()} />
          </Flex>
        )}
      />
      <Column
        key="circulating_supply"
        title="Circulating Supply"
        dataIndex="circulating_supply"
      />
    </Table>
  );
};

export default TableSection;
