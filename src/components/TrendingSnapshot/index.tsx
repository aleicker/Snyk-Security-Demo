import Box from '@mui/material/Box';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { COLORS } from '@/constants';

interface TrendingSnapshotProps {
  value: number;
  direction: 'up' | 'down';
  prevPeriod: string;
}

const propValues = {
  up: {
    Icon: TrendingUpIcon,
    color: COLORS.error,
    text: 'higher',
  },
  down: {
    Icon: TrendingDownIcon,
    color: COLORS.success,
    text: 'lower',
  },
};

export default function TrendingSnapshot({
  value,
  direction,
  prevPeriod,
}: TrendingSnapshotProps) {
  const { Icon, color, text } = propValues[direction];

  return (
    <Box textAlign="center" color={color}>
      <Icon sx={{ fontSize: 50 }} />
      <Box marginTop={-1}>
        Trending {value}% {text} from
        <br /> {prevPeriod}
      </Box>
    </Box>
  );
}
