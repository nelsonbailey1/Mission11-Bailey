import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage () {
    const navigate = useNavigate();
    const {cart, removeFromCart} = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>🛒 Your Cart</h2>
            <div>
                {cart.length === 0 ?
                (<p style={{ textAlign: 'center', color: '#666' }}>Your cart is empty.</p>) :
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {cart.map((item: CartItem) =>
                    <li key={item.bookID} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '1rem', marginBottom: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                        <span style={{ fontWeight: 500 }}>[{item.quantity}] {item.title} - ${item.price.toFixed(2)}</span>
                        <button onClick={() => removeFromCart(item.bookID)} className="btn btn-danger btn-sm">Remove</button>
                    </li>)}
                </ul>
            }
            </div>
            <h3 style={{ textAlign: 'right', marginTop: '1rem', color: '#222' }}>Total: ${totalAmount.toFixed(2)}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button className="btn btn-success">✅ Checkout</button>
                <button onClick={() => navigate(-1)} className="btn btn-outline-primary">← Continue Shopping</button>
            </div>
        </div>
    );
}

export default CartPage;
