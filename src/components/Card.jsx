import { Link} from 'react-router-dom';

export default function Card({id, image, title}){
    return(
        <Link to={`/recipe/${id}`} className="block" > 
        <div className=' border-15 border-neutral-800 bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 w-70'>
            <div className='relative'>
            <img className=' w-70 h-55 object-cover  ' src={image} alt={title} />
            <p className=' absolute bottom-0 bg-neutral-800 bg-opacity-70 w-full text-stone-300 text-center text-lg py-0'>
                {title}
            </p>
        </div>
        </div>
        </Link>
    )
}