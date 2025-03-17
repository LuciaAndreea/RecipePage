export default function Select({options, onChange, className}){
    return(
        <select
        className={`p-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${className}`}
        onChange={onChange}>
            <option value="">All Categories</option>
            {options.map((option) =>(
                <option key={option} value={option}>
                    {option}
                    </option>
            ))}
        </select>
    )
}