import { Box, Grid, Skeleton } from '@mui/material';
import { IRecipeData } from '../../services/recipe/recipe-data.interface';
import RecipeThumbnail from '../recipe-thumbnail/recipe-thumbnail';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  mobile: {
    breakpoint: { min: 0, max: 3000 },
    items: 2,
    partialVisibilityGutter: 30,
  },
};

export default function RecipeList({
  recipes,
  isLoading,
}: {
  recipes: IRecipeData[];
  isLoading?: boolean;
}) {
  return (
    <Carousel
      responsive={responsive}
      partialVisible
      arrows={false}
      additionalTransfrom={recipes.length === 2 ? -60 : 0}
    >
      {recipes?.map((recipe) => (
        <Box
          key={recipe.id}
          sx={{
            justifyContent: 'center',
            display: 'flex',
            px: 1,
          }}
        >
          <RecipeThumbnail recipe={recipe} />
        </Box>
      ))}
    </Carousel>
  );
}
