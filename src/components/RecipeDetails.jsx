import { useEffect, useState } from "react";
import {useParams, Link} from "react-router-dom";
import Button from "./Button";

export default function RecipeDetails(){
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() =>{
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json)
        .then((data) => setRecipe(data.meals ? data.meals[0] : null));
    } , [id]);

    if(!recipe){
        return <p className="text-white text-center mt-10">Loading recipe details...</p>
    }

    return(
        <>
        <div className="p-6 dark:bg-gray-900 min-h-screen text-white">
            <Link to="/">
            <Button className="mb-4">⬅ Back to Recipes</Button>
            </Link>

            <h1 className="text-4xl font-bold">{recipe.strMeal}</h1>
            <p className="text-yellow-400 text-lg mt-2">{recipe.strCategory} | {recipe.strArea}</p>
            <img className="w-full max-w-lg mx-auto rounded-lg mt-4" src={recipe.strMealThumb} alt={recipe.strMeal} />

            <h2 className="text-2xl font-semibold mt-6">Ingredients:</h2>
            <ul className="list-disc list-inside">
                {Array.from({ length: 20},(_,i) => i+i )
                .map((i) => recipe[`strIngredients${i}`] && `${recipe[`strIngredients${i}`]} - ${recipe[`strMeasure${i}`]}`)
                .filter(Boolean)
                .map((ingredient, index) =>(
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            <h2 className="text-2xl font-semibold mt-6">Instructions:</h2>
            <p className="whitespace-pre-line">{recipe.strInstructions}</p>
        </div>
        </>
    )
}