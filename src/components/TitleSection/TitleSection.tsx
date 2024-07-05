import type { FC } from "react";
import { Typography } from "antd";

interface TitleSectionProps {
  text: string | number | null;
  size?: string;
}

const { Text } = Typography;

const TitleSection: FC<TitleSectionProps> = ({ text, size }) => {
  return <Text style={{ fontSize: size }}>{text}</Text>;
};

export default TitleSection;
