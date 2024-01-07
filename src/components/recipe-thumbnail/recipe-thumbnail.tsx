import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  alpha,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { IProps } from './props.interface';

export default function RecipeThumbnail({ recipe }: IProps) {
  return (
    <Card
      draggable={false}
      component={NavLink}
      to={`/recipe/${recipe.id}`}
      sx={{
        display: 'flex',
        boxShadow: 4,
        borderRadius: '28px',
        height: { xs: '50vw', sm: '25vw' },
        maxHeight: { xs: '215px', sm: '250px' },
        width: '100%',
        maxWidth: { xs: '400px', sm: '900px' },
      }}
    >
      <CardMedia
        sx={{
          textAlign: 'left',
          position: 'relative',
          display: 'flex',
          alignItems: 'end',
          width: { xs: '100%', sm: '50%' },
        }}
        image={recipe.image}
      >
        <Box
          sx={(theme) => ({
            p: 2,
            backgroundColor: alpha(theme.palette.primary.dark, 0.75),
            width: '100%',
            borderTopRightRadius: '28px',
            display: { sm: 'none' },
          })}
        >
          <Typography
            sx={{
              color: 'secondary.main',
              position: 'relative',
              fontSize: '20px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxHeight: '75%',
              display: { sm: 'none' },
            }}
            variant='h5'
            component='h2'
          >
            {recipe.title}
          </Typography>
        </Box>
      </CardMedia>
      <CardContent
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          alignItems: 'start',
          width: '50%',
          px: 3,
        }}
      >
        <Typography
          sx={{
            color: 'text.main',
            position: 'relative',
            fontSize: { md: '27px' },
            overflow: 'hidden',
            fontFamily: 'Lato',
            fontWeight: 700,
            mb: 1,
            textAlign: 'left',
            flexShrink: 0,
          }}
          variant='h3'
        >
          {recipe.title}
        </Typography>
        <Box
          sx={{
            borderTop: '1px solid black',
            borderTopColor: 'text.secondary',
            pt: 1,
          }}
        >
          <Typography
            variant='subtitle1'
            sx={{
              textAlign: 'left',
              fontSize: '18px',
              color: 'text.secondary',
              '&& .separator': { fontSize: '10px', mx: 0.5 },
            }}
          >
            {recipe.usedIngredients.map((i, index) => {
              const separator =
                index + 1 === recipe.usedIngredients.length ? '' : '•';

              return (
                <span key={i.originalName}>
                  {i.originalName}{' '}
                  <span className='separator'>{separator} </span>
                </span>
              );
            })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
