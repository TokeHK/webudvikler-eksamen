type TextContentT = {
  text1?: string;
  text2?: string;
  text3?: string;
  text4?: string;
  className?: string;
  id?: string;
}

const textClasses = "border p-2"

const TextContent: React.FC<TextContentT> = ({text1, text2, text3, text4, className, id}) => {
  return (
    <div className="flex flex-col gap-2">
      {text1 &&
        <p className={`${textClasses} ${className ? `${className}` : ''}`} id={id}>{text1}</p>
      }
      {text2 &&
        <p className={`${textClasses} ${className ? `${className}` : ''}`} id={id}>{text2}</p>
      }
      {text3 &&
        <p className={`${textClasses} ${className ? `${className}` : ''}`} id={id}>{text3}</p>
      }
      {text4 &&
        <p className={`${textClasses} ${className ? `${className}` : ''}`} id={id}>{text4}</p>
      }
    </div>
  )
}

export default TextContent