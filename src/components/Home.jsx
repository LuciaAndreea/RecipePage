import { useState, useEffect } from "react";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import logo from '../assets/logoImage.jpg';
import foodBackground from '../assets/food-background.jpg';

export default function Home(){
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Dessert");
    const [sortOrder, setSortOrder] = useState("asc");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() =>{
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((res) => res.json())
        .then((data) => {
            setCategories([
              {
                id: "all",
                name: "All recipes",
                image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg"
              },
            
                ...data.categories.map((cat) =>({
                    id: cat.idCategory,
                    name: cat.strCategory,
                    image: cat.strCategoryThumb,
        }))
            ])});
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
    if(selectedCategory === "All recipes"){
      fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) =>{
        const categoryNames = data.categories.map((cat)=> cat.strCategory);

        Promise.all(
          categoryNames.map((category)=>
          fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((res) => res.json())
        .then((data) => data.meals || []))
        )
        .then((allMeals) =>{
          const sortedMeals = allMeals.flat().sort((a,b) =>
            a.strMeal.localeCompare(b.strMeal)
        );
          setRecipes(sortedMeals);
          setLoading(false);
        });
      })

      .catch((error) => console.log("Error fetching all recipes", error));
    }else{


    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
    .then((res) => res.json())
    .then((data) =>{
      const sortedMeals = (data.meals || []).sort((a,b) =>
        a.strMeal.localeCompare(b.strMeal));
      setRecipes(sortedMeals);
    })
    .catch((error) => console.error("Error fetching recipes: ",error));
  }
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
    <nav className="bg-neutral-900 text-white p-4 flex justify-between items-center md:hidden">
      <h1 className="text-xl font-bold">Recipe App</h1>
      <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">🍔</button>
    </nav>

    {menuOpen && (
      <div className="absolute top-0 left-0 w-64 h-full bg-stone-600 text-white p-4 z-50">
        <button onClick={() => setMenuOpen(false)} className="text-xl mb-4">❌ Close</button>
        <ul>
          {categories.map((category, index) =>(
            <li key={index} className="p-2 cursor-pointer hover:bg-gray-700" onClick={() =>{setSelectedCategory(category.name); setMenuOpen(false);}}>
              {category.image && <img src={category.image} alt={category.name} className="w-6 h-6 inline-block mr-2"></img>}
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    )}
    <div className="flex bg-neutral-900 min-h-screen text-white">
      {/* Sidebar cu categorii */}
      <aside className="hidden md:block w-1/4 bg-neutral-800 text-white p-4 min-h-screen">
      <div className="w-32 h-32 mb-6">
        <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-full shadow-lg"/>
      </div>

      <div className="w-full flex-1 px-4">
        <h2 className="text-lg font-bold mb-4 text-center">Categories</h2>
        <ul className="space-y-3 ">
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`border-1 border-stone-400 cursor-pointer p-4 rounded-md text-xl flex fles-col gap-5 items-center hover:bg-stone-500 transition transform translate-y-2 p-2 ${
                selectedCategory === category.name ? "bg-stone-600 font-bold " : ""
              }`}
            >
                <img
                 src={category.image}
                 alt={category.name}
                 className="w-12 h-12 rounded-full object-cover shadow-md" />
               <span>{category.name}</span>
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
          
          <Button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            Sort {sortOrder === "asc" ? "▼" : "▲"}
          </Button>
        </div>

        {/* Lista de rețete */}
        <h2 className="text-2xl font-bold mb-4">{selectedCategory} Recipes</h2>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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