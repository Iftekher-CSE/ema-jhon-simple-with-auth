import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
    addToDb,
    deleteShoppingCart,
    getStoredCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
const Shop = () => {
    const [cart, setCart] = useState([]);

    const products = useLoaderData();
    console.log(products);
    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    };

    useEffect(() => {
        const storedCard = getStoredCart();
        const savedCart = [];
        for (const id in storedCard) {
            const addedProduct = products.find(product => product.id === id);
            // console.log(addedProduct);
            if (addedProduct) {
                addedProduct.quantity = storedCard[id];
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products]);
    const btnClickHandler = selectedProduct => {
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        } else {
            const rest = cart.filter(
                product => product.id !== selectedProduct.id
            );
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedProduct.id);
    };
    return (
        <div className="shop-container">
            <div className="products-container">
                {products.map(product => (
                    <Product
                        key={product.id}
                        product={product}
                        btnClickHandler={btnClickHandler}
                    ></Product>
                ))}
            </div>
            <div className="cart-container">
                <Cart cart={cart} clearCart={clearCart}>
                    <Link to="/order">
                        <button>Review Cart</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
