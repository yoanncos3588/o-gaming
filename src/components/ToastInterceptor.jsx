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
            case 'gameCreated':
                toast.success('Game created successfully', {
                    toastId: 'toastGameOk',
                });
                break;
            case 'issueCreated':
                toast.success('Issue created successfully', {
                    toastId: 'toastIssueOk',
                });
                break;
            case 'suggestionCreated':
                toast.success('Suggestion created successfully', {
                    toastId: 'toastSuggestionOk',
                });
                break;
            case 'missingGame':
                toast.error("Can't find the game you'r looking for", {
                    toastId: 'toastMissingGame',
                });
                break;
            case 'issueDeleted':
                toast.success('Issue deleted successfully', {
                    toastId: 'toastIssueDeleted',
                });
                break;
            case 'suggestionDeleted':
                toast.success('Suggestion deleted successfully', {
                    toastId: 'toastSuggestionDeleted',
                });
                break;
            case 'searchError':
                toast.error('Something wrong happened', {
                    toastId: 'toastSearchError',
                });
                break;
            case 'gameDeleted':
                toast.success('Game deleted successfully', {
                    toastId: 'toastGameDeleted',
                });
                break;
        }
    }, [searchParams]);

    return <></>;
};

export default ToastInterceptor;
