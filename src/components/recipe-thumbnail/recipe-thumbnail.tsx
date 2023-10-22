import { Button } from '@mui/base';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { IProps } from './props.interface';

export default function RecipeThumbnail({ recipe }: IProps) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component='div'
        sx={{
          // 16:9
          pt: '56.25%',
        }}
        image={recipe.image}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant='h5' component='h2'>
          {recipe.title}
        </Typography>
        <Typography>
          {recipe.usedIngredients.map((i) => i.originalName)}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/recipe/${recipe.id}`}>
          <Button>View</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
