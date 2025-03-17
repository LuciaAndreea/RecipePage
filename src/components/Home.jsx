import { useState, useEffect } from "react";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import Select from "./Select";
import logo from '../assets/logoImage.jpg';
import foodBackground from '../assets/food-background.jpg';

export default function Home(){
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Dessert");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() =>{
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((res) => res.json())
        .then((data) => {
            setCategories(
                data.categories.map((cat) =>({
                    id: cat.idCategory,
                    name: cat.strCategory,
                    image: cat.strCategoryThumb,
        }))
            )});
    }, []);


   useEffect(() =>{
    setLoading(true);
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert")
    .then((res) => res.json())
    .then((data) => {
        setTimeout(() => {
          setRecipes(data.meals || []);
          setLoading(false); 
        }, 100); // Mic delay pentru a permite update-ul UI-ului
      })
      .catch((error) => console.error("Error fetching desserts:", error));
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
    if(sortOrder === "asc") return a.strMeal.localeCompare(b.strMeal);
    return b.strMeal.localeCompare(a.strMeal);
   });

   return(
    <>
    <div className="flex bg-gray-900 min-h-screen text-white">
      {/* Sidebar cu categorii */}
      <aside className="w-1/4 bg-gray-800 flex flex-col items-center py-6">
      <div className="w-32 h-32 mb-6">
        <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-full shadow-lg"/>
      </div>

      <div className="w-full flex-1 overflow-auto px-4">
        <h2 className="text-lg font-bold mb-4 text-center">Categories</h2>
        <ul className="space-y-3 ">
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`border-1 border-stone-400 cursor-pointer rounded-md text-xl text-center hover:bg-gray-700 transition transform translate-y-2 p-2 ${
                selectedCategory === category.name ? "bg-gray-700 font-bold " : ""
              }`}
            >
                <img
                 src={category.image}
                 alt={category.name}
                 className="w-12 h-12 rounded-full object-cover shadow-md" />
              {category.name}
            </li>
          ))}
        </ul>
        </div>
      </aside>

      {/* Conținut principal */}
      <main className="flex-1 p-6">
        {/* Hero Image */}
        <div className="w-full h-80 mb-6">
          <img
            src={foodBackground}
            alt="Food"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Bara de căutare și filtre */}
        <div className="flex gap-4 mb-6">
          <Input
            placeHolder="Search recipes..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Select options={categories.map((cat) => cat.name)} onChange={(event) => setSelectedCategory(event.target.value)} />
          <Button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            Sort {sortOrder === "asc" ? "🔽" : "🔼"}
          </Button>
        </div>

        {/* Lista de rețete */}
        <h2 className="text-2xl font-bold mb-4">{selectedCategory} Recipes</h2>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedRecipes.map((recipe) => (
              <Card key={recipe.idMeal} id={recipe.idMeal} image={recipe.strMealThumb} title={recipe.strMeal} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No recipes found for this category.</p>
        )}
      </main>
    </div>
    </>
  );
}