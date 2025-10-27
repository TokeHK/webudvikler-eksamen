type SectionTitle = {
  text: string;
  className?: string;
  id?: string;
}

const STitle: React.FC<SectionTitle> = ({text, className, id}) => {
  return (
    <h1 className={`text-xl font-bold ${className ? `${className}` : ''}`} id={id}>{text}</h1>
  )
}

export default STitle