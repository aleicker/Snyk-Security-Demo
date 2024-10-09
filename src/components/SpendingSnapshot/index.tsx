import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Card from '../Card';
import TrendingSnapshot from '../TrendingSnapshot';

interface SpendingSnapshotProps {
  title?: string;
  items: [string, any][];
  trending?: 'up' | 'down';
}

export default function SpendingSnapshot({
  title = 'Spending Snapshot',
  trending = 'down',
  items = [],
}: SpendingSnapshotProps) {
  return (
    <Card
      head={
        <Typography component="h3" fontSize={20} textAlign="center">
          {title}
        </Typography>
      }
    >
      {/* TODO: need to get get the previous data range and % difference */}
      <TrendingSnapshot
        value={7}
        direction={trending}
        prevPeriod="09/01/2023 - 09/15/2023"
      />
      <Box marginTop={2.5} marginBottom={2.5}>
        <Divider />
      </Box>
      <List disablePadding dense>
        {items.map(([label, value]) => (
          <ListItem key={label} disablePadding>
            <ListItemText>
              <Typography component="h4" align="center">
                {label}
              </Typography>
              <Typography fontSize={26} fontWeight="bold" align="center">
                {value}
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
