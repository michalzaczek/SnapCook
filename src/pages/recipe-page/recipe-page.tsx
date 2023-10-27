import { NavLink, useParams } from 'react-router-dom';
import { useRecipeInfo } from '../../contexts/recipe-info/recipe-info-context';
import { Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useEffect, useState } from 'react';
import { IRecipeInfo } from '../../contexts/recipe-info/recipe-info.interface';

export default function RecipePage() {
  const { id } = useParams();
  const { getRecipeInfo, setIsFavorite } = useRecipeInfo();
  const [recipe, setRecipe] = useState<IRecipeInfo>();

  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await getRecipeInfo(parseInt(id!));
      setRecipe(recipe);
    };

    getRecipe();
  }, []);

  function setFavorite(id: number, value: boolean) {
    const recipe = setIsFavorite(id, value);

    setRecipe(recipe);
  }

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
                  <IconButton component={NavLink} to={-1 as any}>
                    <ArrowBackIcon sx={{ color: 'primary.contrastText' }} />
                  </IconButton>
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
                  {recipe?.isFavorite ? (
                    <FavoriteIcon
                      onClick={() => setFavorite(recipe.id, false)}
                    />
                  ) : recipe ? (
                    <FavoriteBorderOutlinedIcon
                      onClick={() => setFavorite(recipe.id, true)}
                    />
                  ) : null}
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
          {recipe?.extendedIngredients.map((ingredient, index) => {
            return (
              <Paper key={index}>
                <p>{ingredient.originalName || ingredient.originalString}</p>
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
