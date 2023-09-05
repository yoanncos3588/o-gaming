import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ToastInterceptor = () => {
    let [searchParams] = useSearchParams();

    const toastParam = searchParams.get('toast');

    useEffect(() => {
        switch (toastParam) {
            case 'expired':
                toast.error('Your session has expired, please login', {
                    theme: 'colored',
                });
                break;
            case 'loginOk':
                toast.success('You are now logged, welcome back', {
                    theme: 'colored',
                });
                break;
            case 'unauthorized':
                toast.error('You are not authorized to access this ressource', {
                    theme: 'colored',
                });
                break;
        }
    }, [searchParams, toastParam]);

    return <></>;
};
