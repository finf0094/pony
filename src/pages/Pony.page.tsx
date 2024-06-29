import {Pony} from "@/modules/pony/types";
import {Button} from "@/shared/components";
import {PonyFilter} from "@/modules/pony/ui/PonyFilter/PonyFilter";
import {PonyList} from "@/modules/pony/ui/PonyList/PonyList";
import {useEffect, useState} from "react";
import {faker} from '@faker-js/faker';
import {useNetwork} from "@/shared/lib/hooks/useOnlineStatus";

const generatePonies = (count: number): Pony[] => {
    const colors = ['Фиолетовый', 'Голубой', 'Розовый', 'Красный', 'Зеленый'];
    const kinds = ['Земная пони', 'Единорог', 'Пегас', 'Аликорн', 'Кирин', 'Чейнджлинг'];

    return Array.from({length: count}, () => ({
        name: faker.person.firstName(),
        color: faker.helpers.arrayElement(colors),
        kind: faker.helpers.arrayElement(kinds),
        price: parseFloat(faker.commerce.price({min: 10, max: 50})),
        is_new: faker.datatype.boolean(),
    }));
};

const initialPonies: Pony[] = generatePonies(100);

export const PonyPage = () => {
    const [ponies, setPonies] = useState<Pony[]>(initialPonies);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [cart, setCart] = useState<Pony[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isLoading, setIsLoading] = useState(false);
    const networkStatus = useNetwork();

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleFilter = (filters: any) => {
        let filtered = initialPonies;

        if (filters.color) {
            filtered = filtered.filter((pony) => pony.color === filters.color);
        }
        if (filters.kind) {
            filtered = filtered.filter((pony) => pony.kind === filters.kind);
        }
        if (filters.priceRange) {
            filtered = filtered.filter(
                (pony) =>
                    pony.price >= filters.priceRange.min &&
                    pony.price <= filters.priceRange.max
            );
        }
        if (filters.isNew !== undefined) {
            filtered = filtered.filter((pony) => pony.is_new === filters.isNew);
        }

        setPonies(filtered);
    };

    const handleAddToCart = (pony: Pony) => {
        setCart((prevCart) => [...prevCart, pony]);
    };

    const handlePurchase = () => {
        if (networkStatus.online) {
            setIsLoading(true);
            // Simulate server request
            setTimeout(() => {
                alert('Purchase successful!');
                setCart([]);
                setIsLoading(false);
            }, 1000);
        } else {
            alert('No internet connection. Please try again later.');
        }
    };

    return (
        <div>
            <Button onClick={() => setIsFilterOpen(true)} style={{marginBottom: 15}}>
                Open Filter
            </Button>
            <PonyFilter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} onFilter={handleFilter}/>
            <PonyList ponies={ponies} onAddToCart={handleAddToCart}/>
            <div style={{marginTop: 20}}>
                <h2>Cart</h2>
                {cart.length === 0 ? (
                    <p>No items in cart</p>
                ) : (
                    <>
                        {cart.map((pony, index) => (
                            <li key={index}>{pony.name} - {pony.price}</li>
                        ))}
                        <Button onClick={handlePurchase} disabled={!networkStatus.online || isLoading}>
                            {isLoading ? 'Loading...' : (networkStatus.online ? 'Purchase' : 'No Internet Connection')}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};