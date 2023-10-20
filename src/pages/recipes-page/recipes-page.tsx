import { Button } from "@mui/base";
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Input, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useRecipes } from "../../contexts/recipes/recipes.context";
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";

export default function RecipesPage() {
    const { recipes, setSearchQuery, searchQuery } = useRecipes();

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Input onChange={handleSearch} value={searchQuery} placeholder="Search for a recipe..." endAdornment={<SearchIcon />} sx={{ mb: 4 }}></Input>
            <Grid container spacing={4}>
                {recipes.map((recipe) => (
                    <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="div"
                                sx={{
                                    // 16:9
                                    pt: '56.25%',
                                }}
                                image={recipe.image}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {recipe.title}
                                </Typography>
                                <Typography>
                                    {recipe.usedIngredients.map(i => i.originalName)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/recipe/${recipe.id}`}>
                                    <Button>View</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}