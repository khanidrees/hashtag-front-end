import React from 'react';

import { isLoggedIn } from '../utils/Common';
import {  Navigate} from 'react-router-dom';

const RequireAuth = ({children}) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;