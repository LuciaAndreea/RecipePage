export default function Button({children, onClick, className}){
    return(
        <button 
        onClick={onClick}
        className={`px-4 py-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-600 transition ${className}`}> 
        {children} 
        </button>
    )
}