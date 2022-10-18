import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const Orders = () => {
    const { initialCart } = useLoaderData();
    const [cart, setCart] = useState(initialCart);
    const onClickDeleteHandler = id => {
        const newCart = cart.filter(product => product.id !== id);
        setCart(newCart);
        removeFromDb(id);
    };
    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    };
    return (
        <div className="shop-container">
            <div className="orders-container">
                {cart.map(product => (
                    <ReviewItem
                        key={product.id}
                        product={product}
                        onClickDeleteHandler={onClickDeleteHandler}
                    ></ReviewItem>
                ))}
                {cart.length === 0 && (
                    <h2>
                        There is no item to review. Please shope more{" "}
                        <Link to={"/shop"}>Shop More...</Link>
                    </h2>
                )}
            </div>
            <div className="cart-container">
                <Cart cart={cart} clearCart={clearCart}></Cart>
            </div>
        </div>
    );
};

export default Orders;
