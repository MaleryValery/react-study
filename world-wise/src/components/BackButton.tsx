import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate(-1);
      }}
      typeBtn="back"
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
