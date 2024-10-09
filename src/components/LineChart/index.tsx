import {
  CartesianGrid,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import {
  ValueType,
  NameType,
  Payload,
} from 'recharts/types/component/DefaultTooltipContent';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { COLOR_PALETTE } from './colors';
import { COLORS } from '@/constants';
import styles from './LineChart.module.scss';

interface LineChartProps extends BoxProps {
  title: string;
  titleElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
  height: number;
  linecolors?: string[];
  axisColor?: string;
  gridColor?: string;
  legendHeight?: number;
  data: {
    name?: string;
    [key: string]: any;
  }[];
}

export default function LineChart({
  title,
  titleElement: TitleElement = 'div',
  height,
  linecolors,
  axisColor = COLORS.black,
  gridColor = COLORS.black,
  legendHeight = 40,
  data,
  ...boxProps
}: LineChartProps): JSX.Element | null {
  if (!data.length) {
    return null;
  }

  function createLines() {
    const [chartItem] = data;
    delete chartItem.name;

    return Object.keys(chartItem).map((key, i) => (
      <Line
        key={key}
        type="monotone"
        dataKey={key}
        strokeWidth={2}
        stroke={
          linecolors
            ? linecolors[i]
            : COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]
        }
      />
    ));
  }

  function ChartTooltip({
    active,
    payload,
    ...boxProps
  }: TooltipProps<ValueType, NameType>) {
    if (active && payload && payload.length) {
      return (
        <Box className={styles.tooltip}>
          {payload.map(
            ({ name, value, color }: Payload<ValueType, NameType>) => (
              <Box key={name}>
                <Typography component="span" color={color}>
                  {name}
                </Typography>
                : ${value}
              </Box>
            ),
          )}
        </Box>
      );
    }

    return null;
  }

  return (
    <Box className={styles.container} {...boxProps}>
      <TitleElement className={styles.title}>{title}</TitleElement>
      <Box className={styles.content}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsLineChart data={data}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis stroke={axisColor} dataKey="name" />
            <YAxis stroke={axisColor} />
            <Tooltip content={<ChartTooltip />} />
            <Legend height={legendHeight} />
            {createLines()}
          </RechartsLineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
