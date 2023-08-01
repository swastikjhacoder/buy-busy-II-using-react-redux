// import from react--------------------------------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
// import from css----------------------------------------------------------------------------------------------------
import "./myorder.css";
// import loader style------------------------------------------------------------------------------------------------
import GridLoader from "react-spinners/GridLoader";
// import from react-redux--------------------------------------------------------------------------------------------
import { useSelector } from 'react-redux';

const MyOrder = () => {
  // declaring variables----------------------------------------------------------------------------------------------
  const [loading, setLoading] = useState(false);
  const [orderLoaded, setOrderLoaded] = useState(false);
  const orderData = useSelector((state) => state.busybuy.orderData);
  console.log(orderData);

// set loading on page render for the loader effect-------------------------------------------------------------------
  useEffect(()=> {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 1500);
  },[]);

// set order on page render------------------------------------------------------------------------------------------
  useEffect(() => {
    if(orderData.length > 0) {
      setOrderLoaded(true);
    }else {
      setOrderLoaded(false);
    }
  },[orderData]);

// implementing the UI-----------------------------------------------------------------------------------------------
  return (
    <>
    <div className="orders-container">
        {
          // loader effect
          loading?
          <div style={{marginTop:"30vh"}}>
              <GridLoader
                  color={'#7064e5'}
                  loading={loading}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
              />
          </div>
          :
          <>
          <div>
            {orderLoaded?
              <>
              {/* load orders */}
              <h1>Your Orders</h1>
              {
                orderData.map((order)=> (
                  <div key={Math.random()}>
                    <div className="table-container" key={Math.random()}>
                      <h2>Ordered On:- {order.orderdate}</h2>
                      {/* creating table */}
                      <table className="order-table" key={Math.random()}>
                        <thead>
                          <tr key={Math.random()}>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {order.orders.map((item) =>  */}
                            <tr key={Math.random()}>{order.name}
                                <td>₹ {order.price}</td>
                                <td>{order.quantity}</td>
                                <td>₹ {order.price * order.quantity}</td>
                            </tr>
                          {/* )} */}
                        </tbody>
                        <tr key={Math.random()}  className="totalprice">
                          <td>₹ {order.total}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                ))
              }
              </>
              :
              // heading for order not found
              <h1 className="left-align">No orders found!</h1>
            }
          </div>
          </>
        }
    </div>
    </>
  )
}

export default MyOrder