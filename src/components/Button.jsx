export default function Button({children, onClick, className}){
    return(
        <button 
        onClick={onClick}
        className={`px-4 py-2 rounded-lg border border-gray-600 bg-stone-500 text-white 600 transition ${className}`}> 
        {children} 
        </button>
    )
}