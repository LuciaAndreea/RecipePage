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
       <div className="min-h-screen p-6 flex flex-col items-center"
       style={{
        backgroundImage:`url('/foodImage.jpg')`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundRepeat:"no repeat"
       }}>
       <Link to="/">
            <Button className="mb-10 mr-400 cursor-pointer">← Back to Recipes</Button>
            </Link>
        <h1 className="text-4xl font-bold text-center text-stone-300 mb-0 mr-220">{recipe.strMeal}</h1>
        <img src={logo} alt="Logo" className="relative bottom-15 right-10 w-22 h-22 object-cover rounded-full "/>
        <div className="relative mr-90 max-w-4xl shadow-lg rounded-lg overflow-hidden">
            <img src={recipe.strMealThumb}
             alt={recipe.strMeal}
             className=" h-auto max-h-[400px] object-contain rounded-lg border border-stone-800 shadow-md" />

             
             <div className="p-6">
                <h2 className="text-2xl font-semibold text-stone-300 mb-4">Ingredients</h2>
                <ul className="list-disc list-inside text-stone-300">
                    {[...Array(20)].map((_,i)=>{
                        const ingredient = recipe[`strIngredient${i+1}`];
                        const measure = recipe[`strMeasure${i+1}`];
                        return(
                            ingredient &&(
                                <li key={i}>{measure} {ingredient}</li>
                            )
                        );
                    })}
                </ul>
             </div>
             <div className="p-6">
                <h1 className="text-2xl font-semibold text-gray-700 b-4">Procedure</h1>
                <p className="text-stone-300 leading-relaxed">{recipe.strInstructions}</p>
             </div>
        </div>
       </div>
        </>
    )
}