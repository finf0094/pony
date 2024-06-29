import {useNavigate} from 'react-router-dom';
import {Button, Text} from '@/shared/components';
import {getRouteMain} from "@/shared/routes";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 25,
                height: '85vh',
            }}>
            <Text fontSize="xl" fontWeight="600">OOPS!</Text>
            <Text fontSize="xl">Sorry, an unexpected error has occurred!</Text>
            <Button onClick={() => navigate(getRouteMain())} variant="subtle" color="error">Go back to the main
                page</Button>
        </div>
    );
};