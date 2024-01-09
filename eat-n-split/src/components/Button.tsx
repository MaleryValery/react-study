type ButtonProps = {
  title: string;
  onToggle: () => void;
};

function Button({ title, onToggle }: ButtonProps) {
  return (
    <button type="button" className="button" onChange={onToggle}>
      {title}
    </button>
  );
}

export default Button;
