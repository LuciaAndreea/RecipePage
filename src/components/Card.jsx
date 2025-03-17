import { Link} from 'react-router-dom';

export default function Card({id, image, title}){
    return(
        <Link to={`/recipe/${id}`} className="block" > 
        <div className='p-4 rounded-lg shadow-md bg-gray-800 hover:shadow-lg transition'>
            <img className='w-full h-40 object-cover rounded-lg' src={image} alt={title} />
            <p className='text-center mt-2 text-white'></p>
        </div>
        </Link>
    )
}