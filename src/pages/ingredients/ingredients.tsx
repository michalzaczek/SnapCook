import { useLocation } from "react-router-dom";
import Ingredient from "../../components/ingredient/ingredient";
import style from "./ingredients.module.scss";

export default function IngredientsPage() {
    const location = useLocation();

    const ingredients = (location as any).state;

    return (
        <>
            <h1 className={style.title}>Ingredients</h1>
            {ingredients?.map(i =>
                <Ingredient name={i.name} percentage={i.percentage} key={i.name}></Ingredient>
            )}
        </>
    )
}