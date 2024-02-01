import { SxProps } from '@mui/material';
import { IRecipeInfo } from '../../contexts/recipe-info/recipe-info.interface';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useRecipeInfo } from '../../contexts/recipe-info/recipe-info-context';

export default function FavoriteRecipeIcon({
  recipe,
  sx,
}: {
  recipe?: IRecipeInfo;
  sx?: SxProps;
}) {
  const { setIsFavorite } = useRecipeInfo();

  return (
    <>
      {recipe?.isFavorite ? (
        <FavoriteIcon
          onClick={() => setIsFavorite(recipe.title, false)}
          sx={sx}
        />
      ) : recipe ? (
        <FavoriteBorderOutlinedIcon
          onClick={() => setIsFavorite(recipe.title, true)}
          sx={sx}
        />
      ) : null}
    </>
  );
}
