import { useNavigate, useParams } from 'react-router-dom';
import ContentContainer from '../ContentContainer';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Issue = () => {
    const { idGame, idIssue } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/games/game/${idGame}/issue/${idIssue}`
                );
                console.log(res);
                if (res.status !== 200) {
                    throw Error('Ca');
                }
            } catch (error) {
                toast.error(error.message, {
                    theme: 'colored',
                    toastId: 'errorLogin',
                });
                navigate('/404');
            }
        };
        fetchIssue();
    });

    return <ContentContainer></ContentContainer>;
};

export default Issue;
