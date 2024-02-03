import { NavLink, useParams } from 'react-router-dom';
import { useRecipeInfo } from '../../contexts/recipe-info/recipe-info-context';
import {
  Box,
  CardMedia,
  Container,
  IconButton,
  Skeleton,
  SxProps,
  Typography,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from 'react';
import { IRecipeInfo } from '../../contexts/recipe-info/recipe-info.interface';
import FavoriteRecipeIcon from '../../components/favorite-recipe-icon/favorite-recipe-icon';
import { useUIMessage } from '../../contexts/ui-message/ui-message.context';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import dishImage from '../../assets/placeholder_dish.png';

export default function RecipePage() {
  const { ingredients, title, category } = useParams();
  const { getRecipeInfo, recipes } = useRecipeInfo();
  const [recipe, setRecipe] = useState<IRecipeInfo>();
  const { setMessage, setSeverity, setOpen } = useUIMessage();
  const [isLoading, setIsLoading] = useState(false);

  const iconStyle: SxProps = {
    fontSize: '32px',
  };

  const h2Style: SxProps = {
    textAlign: 'left',
    fontSize: { xs: '20px', md: '32px' },
    fontFamily: 'Lato',
    fontWeight: 700,
    mb: 3,
  };

  useEffect(() => {
    const getRecipe = async () => {
      try {
        setIsLoading(true);

        const recipe = await getRecipeInfo(
          ingredients!.split(','),
          title!,
          category!
        );

        setRecipe(recipe);
        setIsLoading(false);
      } catch (err: any) {
        setSeverity('error');
        setMessage(err);
        setOpen(true);
      }
    };

    getRecipe();
  }, [recipes]);

  return (
    <Container
      sx={{ px: { xs: 0 }, p: { md: '60px' }, bgcolor: 'secondary.main' }}
    >
      <Box>
        <CardMedia
          sx={{
            position: 'relative',
            backgroundColor: 'grey.800',
            color: 'secondary.main',
            mb: 0,
            height: { xs: '200px' },
            pt: 5,
            pl: 5,
            pb: 3,
          }}
          image={dishImage}
        >
          <Box
            sx={{
              backgroundColor: 'black',
              position: 'absolute',
              left: '0',
              top: '0',
              bottom: '0',
              width: '100%',
              background:
                'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(0,212,255,0) 46%)',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              height: '100%',
              position: 'relative',
            }}
          >
            <Typography
              variant='h1'
              sx={{
                color: 'primary.dark',
                fontSize: '50px',
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                display: { md: 'none' },
              }}
            >
              SnapCook
            </Typography>
            <IconButton component={NavLink} to={-1 as any}>
              <ArrowBackIosIcon
                sx={{
                  color: 'primary.dark',
                  ...iconStyle,
                  position: 'relative',
                }}
              />
              <Typography>Back</Typography>
            </IconButton>
          </Box>
        </CardMedia>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'primary.light',
            p: 5,
            pb: 0,
            borderBottomRightRadius: '28px',
            borderBottomLeftRadius: '28px',
          }}
        >
          <Box
            sx={{
              pb: 2,
              mb: 0,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {isLoading ? (
              <Skeleton width={'75%'} />
            ) : (
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
            )}
            {isLoading ? (
              <Skeleton variant='circular' width={40} height={40} />
            ) : (
              <FavoriteRecipeIcon recipe={recipe} sx={{ fontSize: '40px' }} />
            )}
          </Box>
          <Box mb={3}>
            {isLoading ? (
              <Box sx={{ display: 'flex' }}>
                <Skeleton width={150} />
              </Box>
            ) : (
              <Typography
                variant='h6'
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontSize: { xs: '18px', md: '24px' },
                }}
              >
                <AccessTimeFilledIcon
                  sx={{ mr: 1, fontSize: { xs: '30px', md: '30px' } }}
                />
                {recipe?.cookingTime} minutes
              </Typography>
            )}
          </Box>
          <Box mb={3}>
            {isLoading ? (
              <>
                <Skeleton width={120} />
                <Skeleton />
                <Skeleton width={'75%'} />
                <Skeleton width={'50%'} />
                <Skeleton />
              </>
            ) : (
              <>
                <Typography variant='h2' sx={h2Style}>
                  Ingredients
                </Typography>
                {recipe?.ingredients.map((ingredient, index) => {
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
                      <span>{ingredient}</span>
                    </Box>
                  );
                })}
              </>
            )}
          </Box>
        </Box>
        <Box
          textAlign='left'
          sx={{
            p: 5,
          }}
        >
          {isLoading ? (
            <>
              <Skeleton width={120} />
              <Skeleton />
              <Skeleton width={'75%'} />
              <Skeleton width={'50%'} />
              <Skeleton />
            </>
          ) : (
            <>
              <Typography variant='h2' sx={h2Style}>
                Instructions
              </Typography>
              <Typography variant='subtitle1' sx={{ fontSize: { md: '26px' } }}>
                {recipe?.instructions.map((i, index) => (
                  <p key={index}>
                    {index + 1}. {i}
                  </p>
                ))}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
