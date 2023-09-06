import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ToastInterceptor = () => {
    let [searchParams] = useSearchParams();

    useEffect(() => {
        switch (searchParams.get('toast')) {
            case 'loginOk':
                toast.success('Welcome back, your are now logged in', {
                    theme: 'colored',
                    toastId: 'toastLoginOk',
                });
                break;
            case 'tokenExpired':
                toast.error(
                    'You are not logged in, or your session has expired. Please login',
                    {
                        theme: 'colored',
                        toastId: 'toastTokenDead',
                    }
                );
                break;
            case 'unauthorized':
                toast.error('You are not allowed to access this ressource', {
                    theme: 'colored',
                    toastId: 'toastUnauthorized',
                });
                break;
        }
    }, [searchParams]);

    return <></>;
};

export default ToastInterceptor;
