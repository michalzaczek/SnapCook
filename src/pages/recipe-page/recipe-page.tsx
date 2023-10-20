import { useParams } from "react-router-dom"
import { useRecipeInfo } from "../../contexts/recipe-info/recipe-info.context";
import { Grid, Paper, Typography } from "@mui/material";

export default function RecipePage() {
    const { id } = useParams();
    const { recipe } = useRecipeInfo(parseInt(id!));

    return (
        <>
            <Grid container spacing={1} width={"100vw"} justifyContent={"center"} alignContent={"center"}>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            position: 'relative',
                            height: "200px",
                            backgroundColor: 'grey.800',
                            color: '#fff',
                            mb: 0,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundImage: `url(${recipe?.image})`,
                        }}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h5">{recipe?.title}</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h6">{recipe?.readyInMinutes} minutes</Typography>
                </Grid>
                <Grid item xs={8}>
                    {recipe?.extendedIngredients.map(i => {
                        return (
                            <Paper>
                                <p>{i.originalString}</p>
                            </Paper>
                        )
                    })}
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h6">Steps</Typography>
                    <p>{recipe?.instructions}</p>
                </Grid>
            </Grid>

        </>
    )
}