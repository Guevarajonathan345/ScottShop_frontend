import { useContext } from 'react';
import { AuthContext } from './AuthProviderjsx';

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;