import { useState, useEffect } from "react";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import Select from "./Select";

export default function Home(){
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() =>{
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((res) => res.json())
        .then((data) => setCategories(data.categories.map((cat) => cat.strCategory)));
    }, []);



   useEffect(() =>{
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert")
    .then((res) => res.json())
    .then((data) => setRecipes(data.meals || []));
   }, []);

   useEffect(() =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
    .then((res) => res.json())
    .then((data) => setRecipes(data.meals || []));
   }, [selectedCategory]);


   const filteredRecipes = recipes.filter(
    (recipe) =>
        recipe.strMeal.toLowerCase().includes(search.toLowerCase()) ||
        recipe.idMeal.toLowerCase().includes(search.toLowerCase())
   );

   const sortedRecipes = [...filteredRecipes].sort((a,b) =>{
    if(sortOrder === "asc") return a.strMeal.localCompare(b.strMeal);
    return b.strMeal.localCompare(a.strMeal);
   });

   return(
    <>
    <div className="p-6 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold text-white mb-4">Recipe App</h1>

        <div className="flex gap-4 mb-6">
            <Input placeHolder="Search recipes..."
             value={search}
             onChange={(event) => setSearch(event.target.value)}
             ></Input>
             <Select options={categories}
             onChange={(event) =>setSelectedCategory(event.target.value)}
             ></Select>
             <Button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                Sort{sortOrder === "asc" ? "🔽" : "🔼"}
             </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRecipes.map((recipe) =>(
                <Card key={recipe.idMeal}
                id={recipe.idMeal}
                image={recipe.strMealThumb}
                title={recipe.strMeal}
                ></Card>
            ))}
        </div>
    </div>
    </>
   )
}