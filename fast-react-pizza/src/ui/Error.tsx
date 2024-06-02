import { useNavigate, useRouteError } from 'react-router-dom';
import { ErrorResponse } from '../types/types';
import LinkButton from './LinkButton';

function Error() {
  const navigate = useNavigate();
  const error = useRouteError() as ErrorResponse;

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || 'Failed to fetch'}</p>
      <LinkButton linkTo="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
