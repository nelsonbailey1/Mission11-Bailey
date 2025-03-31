import { useNavigate, useParams } from "react-router-dom";
import Welcome from "../components/Welcome";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CheckoutPage () {

    const navigate = useNavigate();
    const {addToCart} = useCart();
    const { title, bookID, price } = useParams();


    const handelAddToCart = () => {
        const newItem: CartItem = {
            bookID: Number(bookID),
            title: String(title),
            price: Number(price),
            quantity: 1}
            addToCart(newItem);
            navigate('/cart');
    }

    return (
        <>
            <Welcome/>
            <h2>{title}</h2>

            <div>
                <label>${price}</label>
                <br />
                <button className='btn btn-success' onClick={handelAddToCart}>Add to Cart</button>
            </div>

            <button className='btn btn-light' onClick={() => navigate('/')}>Return Home</button>
        </>
    );
}

export default CheckoutPage