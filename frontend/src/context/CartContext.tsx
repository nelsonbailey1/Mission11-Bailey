import { CartItem } from "../types/CartItem";
import { ReactNode, createContext, useContext, useState } from "react";

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (BookID: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const bookId = Number(item.bookID);
            const existingItem = prevCart.find((c) => Number(c.bookID) === bookId);
    
            if (existingItem) {
                return prevCart.map((c) =>
                    Number(c.bookID) === bookId
                        ? {
                              ...c,
                              quantity: c.quantity + 1,
                              price: c.price + item.price, // item.price is unit price
                          }
                        : c
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };
    
    const removeFromCart = (bookID : number) => {
        setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
    };

    const clearCart = () => {
        setCart(() => []);
    };
    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if(!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context;
}