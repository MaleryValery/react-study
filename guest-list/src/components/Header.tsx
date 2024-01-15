import Button from './UI/Button';

type HeaderProps = {
  onToggleForm: () => void;
  isFormShow: boolean;
};

function Header({ onToggleForm, isFormShow }: HeaderProps) {
  return (
    <header className="header-wrapper">
      <h2 className="header-title">Add your guests</h2>
      <Button
        title={isFormShow ? 'Close' : 'Add'}
        onClick={onToggleForm}
        className="btn-add"
      />
    </header>
  );
}

export default Header;
