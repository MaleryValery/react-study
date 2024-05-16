import { useNavigate, useRouteError } from 'react-router-dom';
import { ErrorResponse } from '../types/types';

function Error() {
  const navigate = useNavigate();
  const error = useRouteError() as ErrorResponse;

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || 'Failed to fetch'}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
