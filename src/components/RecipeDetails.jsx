import { useEffect, useState } from "react";
import {useParams, Link} from "react-router-dom";
import Button from "./Button";

import logo from '../assets/logoImage.jpg';


export default function RecipeDetails(){
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() =>{
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => setRecipe(data.meals ? data.meals[0] : null));
    } , [id]);

    if(!recipe){
        return <p className="text-white text-center mt-10">Loading recipe details...</p>
    }

    return(
        <>
       <div
      className="min-h-screen p-4 sm:p-6 flex flex-col items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/foodImage.jpg')` }}
    >
      {/* Back Button - Stays at the Top Left */}
      <div className="w-full flex justify-start">
        <Link to="/">
          <Button className="ml-4 mt-4 px-4 py-2 text-sm sm:text-base">
            ← Back to Recipes
          </Button>
        </Link>
      </div>

      {/* Container for content - Moves left on large screens */}
      <div className="w-full lg:w-[80%] xl:w-[70%] flex flex-col lg:ml-12">
        {/* Recipe Title & Logo */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 text-center lg:text-left mt-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-300">{recipe.strMeal}</h1>
          <img
            src={logo}
            alt="Logo"
            className="w-16 sm:w-20 lg:w-24 h-auto rounded-full mt-2 lg:mt-0 mx-auto lg:mx-0 lg:ml-4"
          />
        </div>

        {/* Recipe Image - More to the Left on Large Screens */}
        <div className="flex lg:justify-start justify-center mt-6">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full max-w-[400px] h-auto object-cover rounded-lg border border-stone-800 shadow-md mx-auto lg:mx-0"
          />
        </div>

        {/* Ingredients */}
        <div className="mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-stone-300 mb-4">Ingredients</h2>
          <ul className="list-disc list-inside text-stone-300">
            {[...Array(20)].map((_, i) => {
              const ingredient = recipe[`strIngredient${i + 1}`];
              const measure = recipe[`strMeasure${i + 1}`];
              return (
                ingredient && (
                  <li key={i}>{measure} {ingredient}</li>
                )
              );
            })}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-stone-300 mb-4">Procedure</h2>
          <p className="text-stone-300 leading-relaxed">{recipe.strInstructions}</p>
        </div>
      </div>
    </div>
        </>
    )
}