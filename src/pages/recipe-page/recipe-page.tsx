import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecipeInfo } from '../../contexts/recipe-info/recipe-info.context';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export default function RecipePage() {
  const { id } = useParams();
  const { recipe } = useRecipeInfo(parseInt(id!));
  const navigate = useNavigate();

  return (
    <>
      <Grid
        container
        spacing={1}
        width={'100vw'}
        justifyContent={'center'}
        alignContent={'center'}
      >
        <Grid item xs={12}>
          <Paper
            sx={{
              position: 'relative',
              height: '200px',
              backgroundColor: 'grey.800',
              color: '#fff',
              mb: 0,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: `url(${recipe?.image})`,
            }}
          >
            <Grid container>
              <Grid item xs={6}>
                <Box
                  sx={{
                    position: 'relative',
                    p: { xs: 3, md: 6 },
                    pr: { md: 0 },
                    textAlign: 'left',
                  }}
                >
                  <ArrowBackIcon
                    onClick={() => navigate(-1)}
                    sx={{ color: 'primary.contrastText' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    position: 'relative',
                    p: { xs: 3, md: 6 },
                    pl: { md: 0 },
                    textAlign: 'right',
                  }}
                >
                  <FavoriteBorderOutlinedIcon />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Typography variant='h5'>{recipe?.title}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant='h6'>{recipe?.readyInMinutes} minutes</Typography>
        </Grid>
        <Grid item xs={8}>
          {recipe?.extendedIngredients.map((i) => {
            return (
              <Paper key={i.originalString}>
                <p>{i.originalString}</p>
              </Paper>
            );
          })}
        </Grid>
        <Grid item xs={8}>
          <Typography variant='h6'>Steps</Typography>
          <p>{recipe?.instructions}</p>
        </Grid>
      </Grid>
    </>
  );
}
