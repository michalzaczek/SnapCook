import { Grid, Skeleton } from '@mui/material';
import { IRecipeData } from '../../services/recipe/recipe-data.interface';
import RecipeThumbnail from '../recipe-thumbnail/recipe-thumbnail';

export default function RecipeList({
  recipes,
  isLoading,
}: {
  recipes: IRecipeData[];
  isLoading?: boolean;
}) {
  return (
    <Grid container spacing={4}>
      {isLoading ? (
        <>
          <Grid sx={{ width: '100%' }} item xs={12}>
            <Skeleton
              animation='wave'
              variant='rectangular'
              height={250}
            ></Skeleton>
          </Grid>
          <Grid sx={{ width: '100%' }} item xs={12}>
            <Skeleton
              animation='wave'
              variant='rectangular'
              height={250}
            ></Skeleton>
          </Grid>
          <Grid sx={{ width: '100%' }} item xs={12}>
            <Skeleton
              animation='wave'
              variant='rectangular'
              height={250}
            ></Skeleton>
          </Grid>
        </>
      ) : (
        recipes?.map((recipe) => (
          <Grid
            item
            key={recipe.id}
            sx={{
              justifyContent: 'center',
              display: 'flex',
              width: '100%',
            }}
          >
            <RecipeThumbnail recipe={recipe} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
