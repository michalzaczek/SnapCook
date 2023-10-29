import { NavLink, useParams } from 'react-router-dom';
import { useRecipeInfo } from '../../contexts/recipe-info/recipe-info-context';
import {
  Box,
  CardMedia,
  Container,
  Grid,
  IconButton,
  SxProps,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { IRecipeInfo } from '../../contexts/recipe-info/recipe-info.interface';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import FavoriteRecipeIcon from '../../components/favorite-recipe-icon/favorite-recipe-icon';

export default function RecipePage() {
  const { id } = useParams();
  const { getRecipeInfo, recipes } = useRecipeInfo();
  const [recipe, setRecipe] = useState<IRecipeInfo>();

  const iconStyle: SxProps = {
    fontSize: '32px',
  };

  const h2Style: SxProps = {
    textAlign: 'left',
    fontSize: { xs: '24px', md: '32px' },
    fontFamily: 'Lato',
    fontWeight: 700,
    mb: 3,
  };

  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await getRecipeInfo(parseInt(id!));
      setRecipe(recipe);
    };

    getRecipe();
  }, [recipes]);

  return (
    <Container sx={{ px: { xs: 0 }, p: { md: '60px' } }}>
      <Box mb={3}>
        <CardMedia
          sx={{
            position: 'relative',
            backgroundColor: 'grey.800',
            color: 'secondary.main',
            mb: 0,
            height: { xs: '300px' },
          }}
          image={recipe?.image}
        >
          <Box
            sx={{
              backgroundColor: 'black',
              position: 'absolute',
              left: '0',
              top: '0',
              width: '100%',
              height: '100px',
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.7456232492997199) 0%, rgba(0,0,0,0.4907212885154062) 50%, rgba(0,212,255,0) 100%)',
              display: { md: 'none' },
            }}
          />
          <Grid container sx={{ display: { md: 'none' } }}>
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
                  <ArrowBackIcon
                    sx={{
                      color: 'primary.contrastText',
                      ...iconStyle,
                      position: 'relative',
                      top: '-7px',
                    }}
                  />
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
                <FavoriteRecipeIcon recipe={recipe} sx={iconStyle} />
              </Box>
            </Grid>
          </Grid>
        </CardMedia>
      </Box>
      <Box sx={{ p: { xs: 2, md: 0 } }} display='flex' flexDirection='column'>
        <Box
          sx={{
            borderBottom: '1px solid',
            borderColor: 'text.secondary',
            pb: 2,
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant='h1'
            sx={{
              textAlign: 'left',
              fontSize: { xs: '28px', md: '34px' },
              fontFamily: 'Lato',
              fontWeight: 700,
            }}
          >
            {recipe?.title}
          </Typography>
          <FavoriteRecipeIcon
            recipe={recipe}
            sx={{ fontSize: '40px', display: { xs: 'none', md: 'block' } }}
          />
        </Box>
        <Box mb={3}>
          <Typography
            variant='h6'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: { xs: '18px', md: '24px' },
            }}
          >
            <TimerOutlinedIcon sx={{ mr: 1, fontSize: { md: '30px' } }} />
            {recipe?.readyInMinutes} minutes
          </Typography>
        </Box>
        <Box mb={3}>
          <Typography variant='h2' sx={h2Style}>
            Ingredients
          </Typography>
          {recipe?.extendedIngredients.map((ingredient, index) => {
            return (
              <Box
                key={index}
                sx={{
                  textAlign: 'left',
                  borderBottom: '1px dotted',
                  mb: 2,
                  pb: 0.5,
                }}
              >
                <span>
                  <b>
                    {ingredient.amount} {ingredient.unit}{' '}
                  </b>
                </span>
                <span>
                  {ingredient.originalName || ingredient.originalString}
                </span>
              </Box>
            );
          })}
        </Box>
        <Box textAlign='left'>
          <Typography variant='h2' sx={h2Style}>
            Instructions
          </Typography>
          <Typography variant='subtitle1' sx={{ fontSize: { md: '26px' } }}>
            {recipe?.instructions}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
