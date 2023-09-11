import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth';
import { Fragment } from 'react';

// eslint-disable-next-line react/prop-types
const Protected = ({ element, ...rest }) => {
  const { authenticated } = useAuth(); 
  return authenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Fragment>
    <Navigate to="/login" />
    <Navigate to="/register" />  
    
    </Fragment>
  );
};

export default Protected;
