import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Jumbotron from '@/components/Jumbtron';
import LineChart from '@/components/LineChart';
import Card from '@/components/Card';
import ContentSection from '@/components/ContentSection';
import NoData from '@/components/NoData';
import { getAllExpenseGroups } from '@/api';
import { getTotalBalance, getTotalOverdueBalances } from '@/utils/expenses';
import { COLORS } from '@/constants';

const chartData = [
  {
    name: 'Jan',
    2022: 4500,
    2023: 3500,
  },
  {
    name: 'Feb',
    2022: 5200,
    2023: 4300,
  },
  {
    name: 'Mar',
    2022: 3320,
    2023: 4700,
  },
  {
    name: 'Apr',
    2022: 4356,
    2023: 7034,
  },
  {
    name: 'May',
    2022: 5670,
    2023: 3290,
  },
  {
    name: 'Jun',
    2022: 4300,
    2023: 5230,
  },
  {
    name: 'Jul',
    2022: 2300,
    2023: 3345,
  },
  {
    name: 'Aug',
    2022: 8030,
    2023: 4356,
  },
  {
    name: 'Sep',
    2022: 5467,
    2023: 3456,
  },
  {
    name: 'Oct',
    2022: 7345,
    2023: 5233,
  },
  {
    name: 'Nov',
    2022: 6100,
    2023: 4355,
  },
  {
    name: 'Dec',
    2022: 3567,
    2023: 7100,
  },
];

export default function Dashboard() {
  const router = useRouter();

  const { data } = useQuery(['expenseGroups'], () => getAllExpenseGroups());

  if (data && !data?.expenseGroups.length)
    return (
      <NoData
        text="You have no expense groups to display"
        btn={{
          children: '+ Add Expense Group',
          onClick: () => router.push('/account/add-expense-group'),
        }}
      />
    );

  return (
    <>
      <Jumbotron>
        {!data ? (
          <CircularProgress />
        ) : (
          <LineChart
            title="12 Month Spending Snapshot"
            titleElement="h2"
            height={250}
            linecolors={[COLORS.info, COLORS.success]}
            axisColor={COLORS.white}
            gridColor="rgba(255,255,255,0.15)"
            data={chartData}
          />
        )}
      </Jumbotron>
      <ContentSection>
        {!data ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box paddingBottom={2}>
              <Button onClick={() => router.push('/account/add-expense-group')}>
                + Add Expense Group
              </Button>
            </Box>
            <Grid container spacing={2}>
              {data.expenseGroups.map((expenseGroup) => {
                const expenses = expenseGroup?.expenses;
                const numOverdueBalances = !expenses
                  ? 0
                  : getTotalOverdueBalances(expenses);
                return (
                  <Grid key={expenseGroup?._id} item xs={12} sm={12} md={4}>
                    <Card
                      link={`/account/expense-group/${expenseGroup?._id}`}
                      head={`${expenseGroup?.startDate} - ${expenseGroup?.endDate}`}
                      height="100%"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box>
                          Total Balance:
                          <br />
                          {expenses ? (
                            '$' + getTotalBalance(expenses)
                          ) : (
                            <Button size="small">Add Expenses</Button>
                          )}
                        </Box>
                        {numOverdueBalances > 0 && (
                          <Box textAlign="center">
                            <ErrorOutlineIcon color="error" fontSize="large" />
                            <Typography
                              fontSize={11}
                              color={COLORS.error}
                              marginTop={-0.5}
                            >
                              {numOverdueBalances} overdue expenses
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </ContentSection>
    </>
  );
}
