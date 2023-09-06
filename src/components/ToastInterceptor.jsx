import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ToastInterceptor = () => {
    let [searchParams] = useSearchParams();

    useEffect(() => {
        switch (searchParams.get('toast')) {
            case 'loginOk':
                toast.success('Welcome back, your are now logged in', {
                    toastId: 'toastLoginOk',
                });
                break;
            case 'tokenExpired':
                toast.error(
                    'You are not logged in, or your session has expired. Please login',
                    {
                        toastId: 'toastTokenDead',
                    }
                );
                break;
            case 'unauthorized':
                toast.error('You are not allowed to access this ressource', {
                    toastId: 'toastUnauthorized',
                });
                break;
            case 'accountOk':
                toast.success('Account created successfully', {
                    toastId: 'toastAccountOk',
                });
                break;
        }
    }, [searchParams]);

    return <></>;
};

export default ToastInterceptor;
