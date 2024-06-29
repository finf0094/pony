import { useState, useEffect } from 'react';

export const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

    const checkOnlineStatus = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?page=1", { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            console.error('Error checking online status:', error);
            return false;
        }
    };

    useEffect(() => {
        const updateOnlineStatus = async () => {
            const online = await checkOnlineStatus();
            setIsOnline(online);
        };

        updateOnlineStatus();

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
};
