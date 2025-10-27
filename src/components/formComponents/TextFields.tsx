type TextFieldProps = {
  label: string;
  className?: string;
  type: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextFields = ({ label, className = "",  ...props }: TextFieldProps) => {

return (
  <div className="mb-5">
    <label className="block text-md font-bold mb-1" htmlFor={label}>{label}</label>
      <input
      {...props}
      className={`shadow border-gray-300 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`} 
      id={label}
      autoComplete="true"/>
  </div>
  )
}

export default TextFields;