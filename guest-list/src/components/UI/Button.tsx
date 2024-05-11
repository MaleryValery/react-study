type ButtonProps = {
  title: string;
  className?: string;
  onClick: () => void;
};

function Button({ title, className, onClick }: ButtonProps) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {title}
    </button>
  );
}

Button.defaultProps = {
  className: 'btn-add',
};

export default Button;
