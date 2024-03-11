import { IconButton, Skeleton, Typography } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import { NavLink } from 'react-router-dom';
import PageHeader from '../../components/page-header/page-header';
import { useAuth } from '../../contexts/auth/AuthContext';
import { useGetPaymentHistory } from '../../hooks/useGetPaymentHistory';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const textStyle: SxProps = {
  textAlign: 'left',
  fontSize: '20px',
  textTransform: 'capitalize',
  fontWeight: 500,
  lineHeight: 1,
};

export default function PaymentHistoryPage() {
  const { state } = useAuth();
  const { paymentHistory, isLoading } = useGetPaymentHistory(state.user?.uid);

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader>
        <IconButton
          component={NavLink}
          to={-1 as any}
          sx={{ justifyContent: 'flex-start', alignSelf: 'flex-start' }}
        >
          <ArrowBackIosIcon
            sx={{
              color: 'primary.dark',
              position: 'relative',
            }}
          />
          <Typography sx={{ fontWeight: 700 }}>Back</Typography>
        </IconButton>
      </PageHeader>
      <Typography
        variant='subtitle1'
        sx={{
          ...textStyle,
          mr: 3,
          px: 5,
          mt: 3,
        }}
      >
        Payment history
      </Typography>
      <Box
        sx={{
          px: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            pt: 5,
            pb: 2,
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              aligni: 'center',
              flexDirection: 'column',
              width: '100%',
              mb: 3,
              pb: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                borderBottom: '1px solid black',
                mb: 2,
                pb: 2,
              }}
            >
              <Typography
                variant='subtitle1'
                sx={{
                  ...textStyle,
                  width: '50%',
                }}
              >
                Date
              </Typography>
              <Typography
                variant='subtitle1'
                sx={{
                  ...textStyle,
                  width: '50%',
                }}
              >
                Amount
              </Typography>
            </Box>
            <Box>
              {isLoading && (
                <>
                  <Box sx={{ display: 'flex' }}>
                    <Skeleton sx={{ mr: 2 }} width={'50%'} />
                    <Skeleton width={'50%'} />
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Skeleton sx={{ mr: 2 }} width={'50%'} />
                    <Skeleton width={'50%'} />
                  </Box>
                </>
              )}
              {paymentHistory.map((h) => {
                return (
                  <Box sx={{ mb: 2, display: 'flex' }}>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        ...textStyle,
                        width: '50%',
                        fontWeight: 400,
                      }}
                    >
                      {h.created.getDate()}/{h.created.getMonth() + 1}/
                      {h.created.getFullYear()}
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        ...textStyle,
                        width: '50%',
                        fontWeight: 400,
                      }}
                    >
                      {h.amount_received} {h.currency.toUpperCase()}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
