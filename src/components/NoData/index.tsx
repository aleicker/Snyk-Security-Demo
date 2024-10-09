import ContentSection from '@/components/ContentSection';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface NoDataProps {
  text: string;
  btn?: ButtonProps;
}

export default function NoData({ text, btn }: NoDataProps) {
  return (
    <ContentSection textAlign="center">
      <Typography>{text}</Typography>
      {btn && (
        <Box marginTop={3}>
          <Button variant="contained" href={btn.href} onClick={btn.onClick}>
            {btn.children}
          </Button>
        </Box>
      )}
    </ContentSection>
  );
}
