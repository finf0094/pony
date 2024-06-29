import React, { useState } from 'react';
import { Button, Input, Modal } from "@/shared/components";
import styles from './PonyFilter.module.scss';

interface PonyFilterProps {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line
    onFilter: (filters: any) => void;
}

const colors = ['Фиолетовый', 'Голубой', 'Розовый', 'Красный', 'Зеленый'];
const kinds = ['Земная пони', 'Единорог', 'Пегас', 'Аликорн', 'Кирин', 'Чейнджлинг'];

export const PonyFilter: React.FC<PonyFilterProps> = ({ isOpen, onClose, onFilter }) => {
    const [color, setColor] = useState('');
    const [kind, setKind] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
    const [isNew, setIsNew] = useState(false);

    const handleFilter = () => {
        onFilter({ color, kind, priceRange, isNew });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.filterContainer}>
                <h2>Filter Ponies</h2>
                <select className={styles.select} value={color} onChange={(e) => setColor(e.target.value)}>
                    <option value="">Select Color</option>
                    {colors.map((color) => (
                        <option key={color} value={color}>
                            {color}
                        </option>
                    ))}
                </select>
                <select className={styles.select} value={kind} onChange={(e) => setKind(e.target.value)}>
                    <option value="">Select Kind</option>
                    {kinds.map((kind) => (
                        <option key={kind} value={kind}>
                            {kind}
                        </option>
                    ))}
                </select>
                <Input
                    placeholder="Min Price"
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                />
                <Input
                    placeholder="Max Price"
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                />
                <label className={styles.label}>
                    <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
                    New
                </label>
                <Button onClick={handleFilter}>Find</Button>
            </div>
        </Modal>
    );
};