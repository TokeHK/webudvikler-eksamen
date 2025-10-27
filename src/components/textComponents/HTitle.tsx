type HeadingTitle = {
  text: string;
  className?: string;
  id?: string;
}

const HTitle: React.FC<HeadingTitle> = ({text, className, id}) => {
  return (
    <h1 className={`text-2xl font-bold ${className ? `${className}` : ''}`} id={id}>{text}</h1>
  )
}

export default HTitle