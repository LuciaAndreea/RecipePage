import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './components/Home';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path = "/" element={<Home></Home>}></Route>
        <Route path ="/recipe/:id" element={<RecipeDetails></RecipeDetails>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
