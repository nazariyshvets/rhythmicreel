interface PlaceholderProps {
  children?: JSX.Element;
  className?: string;
}

function Placeholder({ children, className = "" }: PlaceholderProps) {
  return <div className={`h-72 flex-1 p-4 ${className}`}>{children}</div>;
}

export default Placeholder;
