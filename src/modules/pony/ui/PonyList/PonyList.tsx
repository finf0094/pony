import React, {useState} from 'react';
import {Pony} from "../../types";
import {Button, Card, classNames} from "@/shared/components";
import styles from './PonyList.module.scss';

interface PonyListProps {
    ponies: Pony[];
    onAddToCart: (pony: Pony) => void;
    className?: string;
}

export const PonyList: React.FC<PonyListProps> = ({ponies, onAddToCart, className}) => {
    const isOnline = navigator.onLine;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const paginatedPonies = ponies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(ponies.length / itemsPerPage);

    return (
        <div className={classNames(styles.container, className)}>
            <div className={styles.ponyList}>
                {paginatedPonies.map((pony) => (
                    <Card key={pony.name} className={styles.ponyCard}>
                        <h3>{pony.name}</h3>
                        <p>{pony.color}</p>
                        <p>{pony.kind}</p>
                        <p>{pony.price}</p>
                        <p>{pony.is_new ? 'Новый' : 'Старый'}</p>
                        <Button
                            onClick={() => onAddToCart(pony)}
                        >
                            {isOnline ? 'Add to Cart' : 'No Internet Connection'}
                        </Button>
                    </Card>
                ))}
            </div>
            <div className={styles.pagination}>
                <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage >= totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};