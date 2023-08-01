// Import from react-------------------------------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
// Import from css---------------------------------------------------------------------------------------------------
import "./cart.css";
// Import loader style-----------------------------------------------------------------------------------------------
import GridLoader from "react-spinners/GridLoader";
// Import react toastify---------------------------------------------------------------------------------------------
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import from react-redux-------------------------------------------------------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
// Import actions from reducer---------------------------------------------------------------------------------------
import { addToOrder, decrementQuantity, deleteItem, incrementQuantity, resetCart } from '../../redux/busybuySlice';
// Import from ract-router-dom---------------------------------------------------------------------------------------
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  // declaring variables---------------------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productData = useSelector((state)=> state.busybuy.productData);
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(false);
  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

// set loading on page render for the loader effect------------------------------------------------------------------
  useEffect(()=> {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 1500);
  },[]);

// calculate total price in each product added-----------------------------------------------------------------------
  useEffect(() => {
    let price =0;
    productData.map((item)=> {
      price += item.price * item.quantity;
      return price;
    });
    setTotal(price);
  },[productData]);

// add to myorder---------------------------------------------------------------------------------------------------
  const handlePurchase = () => {
    productData.map((product)=> (
      dispatch(addToOrder({
        orderdate: date,
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        total: total,
      }))
    ))
    dispatch(resetCart());
    navigate("/myorder");
  };

// Implementing the UI-----------------------------------------------------------------------------------------------
  return (
    <div className="cartpage-container">
      {loading?
      <>
      {/* loader effect */}
      <div style={{marginTop:"30vh"}}>
        <GridLoader
            color={'#7064e5'}
            loading={loading}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
      </div>
      </>
      :
      <>
      {
        productData.length > 0 ?
        <>
        {/* creating sidebar total price */}
        <aside className="totalprice">
          <p >TotalPrice:- ₹{total}/-</p>
          <button className="purchase-button" onClick={()=> handlePurchase()}>Purchase</button>
        </aside>
        <div className="product-grid">
          {/* listing the cart items */}
            {productData.map((products,i) => (
                <div className="product-container" key={i}>
                    <div className="productimage-container">
                        <img src={products.image}
                            alt="Product" 
                            width="100%" 
                            height="100%"/>
                    </div>
                    <div className="product-details">
                        <div className="product-name">
                            <p>{products.name}</p>
                        </div>
                        <div className="product-options">
                            <p>₹ {products.price}</p>
                            <div className="quantity-container">
                                <img 
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFElEQVR4nO2WT2rCQBTGf5dwUWuK55D2AIVWeg012rN016J00aX7/rmJEU9h4s6IZeAJocTJm0mmZOEH3yaQ/Hhf3rw3cFELdQNMgR8gAXbiRJ7FQNQk8Bp4A3LgWOEDsAT6daFPQKYA/nUKDH2hz1KBK7RY/cyn0kMNaBGurrznGa8t9q4G/N4g9OS55shoutfVuSR5VrMA0JMnNvB3QPCnDbwJCE5s4LTkhQHuuj3T3U5g8xFX3bmC1wGjXrWyueKA4JENHAUaIPuqAWK0CAB+Rbn4y7rb11vgCqXuG4rcrMVHLbQ4t+teBMwdzUtDz9hNvA/UVAd4kc7UVPnh8k816slq+5IplIlXMhzGmiNzEf+tX262pRCJmsimAAAAAElFTkSuQmCC" 
                                  alt='-'
                                  onClick={products.quantity > 1 ?
                                    ()=> dispatch(decrementQuantity({
                                      id: products.id,
                                      name: products.name,
                                      image: products.image,
                                      price: products.price,
                                      quantity: 1,
                                    }))
                                    :
                                    ()=> dispatch(deleteItem(products.id))}
                                />
                                <span>{products.quantity}</span>
                                <img 
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHUlEQVR4nO2WQWrCQBSGv0t0oVXxHFIPIKj0GlWrZ3HXonTRpXutNzHFUxjdNZISeEIIY/Je0iku/OFtwpCP988/bwbuukG1gFdgCwTASSqQbxOg+ZfAR+AdiIC4oM7ACmhXhT4DRwUwWyEwLAudSQdWaLr7aZlOzxWgabi684bS3g7wpLS9rgF/KLu5SLN2oTkykQdwJE5e1dSwfxZwDIzzwF8ewes88N4jOMgDh1fSa5Ur7aEVnPzEqq4V/O3R6t1NhmviEfySB256GiA/RQMk0dID+A3lxe9KtyvtrvRm6wDUUKpnsLzoWhxooem5XfUhkLzRSmmotN1lb5+KegDmkkxNl5+WPdWoIVfbRqbQUWonw2GkOTJ38d/6BZ8CjheXznrAAAAAAElFTkSuQmCC" 
                                  alt='+'
                                  onClick={()=> dispatch(incrementQuantity({
                                    id: products.id,
                                    name: products.name,
                                    image: products.image,
                                    price: products.price,
                                    quantity: 1,
                                  }))}
                                />
                            </div>
                        </div>
                        <button 
                          className="remove-button" 
                          title="Remove From Cart"
                          onClick={()=> dispatch(deleteItem(products.id)) & toast.success('Product Removed Successfully!')}
                        >
                          Remove From Cart
                        </button>
                    </div>
                </div>
            ))}
        </div> 
        </>
        :
        <>
        {/* display empty cart heading */}
        <h1 className="left-align">Cart is Empty!</h1>
        </>
      }
      </>}
      <ToastContainer />
    </div>
  )
}

export default Cart