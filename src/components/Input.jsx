export default function Input({ placeHolder, value, onChange, className }){
    return(
        <input
         type="text"
         placeholder={placeHolder}
         value={value}
         onChange={onChange}
         className={`p-2 w-full rounded-lg border border-gray-600 bg-stone-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${className}`}
         />
    )
}