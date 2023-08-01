// Import from react-------------------------------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
// Import from css---------------------------------------------------------------------------------------------------
import './home.css';
// Import loader style-----------------------------------------------------------------------------------------------
import GridLoader from "react-spinners/GridLoader";
// Import from react-toastify----------------------------------------------------------------------------------------
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import from react-router-dom--------------------------------------------------------------------------------------
import { useLoaderData, useNavigate } from 'react-router-dom';
// Import from react-redux-------------------------------------------------------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
// Import action from redux------------------------------------------------------------------------------------------
import { addToCart } from '../../redux/busybuySlice';

const Home = () => {
  // declaring variables-------------------------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useLoaderData();
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] =  useState([]);
  const [scrollPrice, setScrollPrice] = useState(75000);
  const [filterData, setFilterData] = useState('');
  const [gents,setGents] = useState(true);
  const [ladies,setLadies] = useState(true);
  const [jewelery, setJewelery] = useState(true);
  const [electronics, setElectronics] = useState(true);
  const userInfo = useSelector((state) => state.busybuy.userInfo);
  const productData = useSelector((state)=> state.busybuy.productData);
  const [loading, setLoading] = useState(false);

  // set loading on page render for the loader effect------------------------------------------------------------------
  useEffect(()=> {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 1500);
  },[]);


// loadeing all products----------------------------------------------------------------------------------------------
  useEffect(()=> {
    setProducts(data);
    setSearchProducts(data);
  },[data]);


// search products from input text------------------------------------------------------------------------------------
  const handleSearch = (e) => {
    if(e.target.value === '') {
        setProducts(searchProducts);
    }else {
        const filteredResult = searchProducts.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setProducts(filteredResult);
    }
    setFilterData(e.target.value)
  };


// list products from price range-------------------------------------------------------------------------------------
  const changePrice = (e) => {
    if(e.target.value > 0){
        setProducts(searchProducts);
    }
    const resProd = searchProducts.filter(item => item.price < e.target.value)
    setProducts(resProd);
    setScrollPrice(e.target.value);
  };


// list products from category selection-----------------------------------------------------------------------------
  const handleSearchByCategory = (e) => {
    if(e === "gents") {
        document.getElementById('ladies').checked = false;
        document.getElementById('jewelery').checked = false;
        document.getElementById('electronics').checked = false;
        setProducts(searchProducts);
        if(gents === true) {
            const filteredResult = searchProducts.filter(item => item.category.toLowerCase().includes(e.toLowerCase()));
            setProducts(filteredResult);
        }
        setGents(!gents);
    } 
    if(e === "ladies") {
        document.getElementById('gents').checked = false;
        document.getElementById('jewelery').checked = false;
        document.getElementById('electronics').checked = false;
        setProducts(searchProducts);
        if(ladies === true) {
            const filteredResult = searchProducts.filter(item => item.category.toLowerCase().includes(e.toLowerCase()));
            setProducts(filteredResult);
        }
        setLadies(!ladies);
    } 
    if(e === "jewelery") {
        document.getElementById('gents').checked = false;
        document.getElementById('ladies').checked = false;
        document.getElementById('electronics').checked = false;
        setProducts(searchProducts);
        if(jewelery === true) {
            const filteredResult = searchProducts.filter(item => item.category.toLowerCase().includes(e.toLowerCase()));
            setProducts(filteredResult);
        }
        setJewelery(!jewelery);
    } 
    if(e === "electronics") {
        document.getElementById('gents').checked = false;
        document.getElementById('ladies').checked = false;
        document.getElementById('jewelery').checked = false;
        setProducts(searchProducts);
        if(electronics === true) {
            const filteredResult = searchProducts.filter(item => item.category.toLowerCase().includes(e.toLowerCase()));
            setProducts(filteredResult);
        }
        setElectronics(!electronics);
    }
  };


// add to cart functionality-----------------------------------------------------------------------------------------
  const handleAddToCart = (prod) => {
    if(userInfo){
      dispatch(addToCart({
        id: prod.id,
        name: prod.name,
        image: prod.image,
        category: prod.category,
        price: prod.price,
        quantity: 1,
      }));

      const index = productData.findIndex((item) => item.id === prod.id);
      
      if (index === -1) {
        toast.success('Product Added Successfully!')
      }else {
        toast.success('Increase product count!');
      }

    }else {
      navigate("/signin")
    }
  }

// implementing the UI-----------------------------------------------------------------------------------------------
  return (
    <>
    <div className="homepage-container">
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
      {/* sidebar */}
      <aside className="sidebar-container">
        <h2>Filter</h2>
        <form>
          <label htmlFor="price">Price: &#8377; {scrollPrice}</label>
          <input type="range" 
              className="price-range"
              id="price" 
              name="price" 
              min="1" 
              max="100000" 
              step="10" 
              defaultValue="75000"
              onChange={changePrice}/>
          <h2>Category</h2>
          <div >
            <div className="checkbox-container">
              <input className="larger" 
                  value="gents"  
                  onChange={()=> handleSearchByCategory("gents")}
                  type="checkbox" 
                  id="gents" 
                  name="gents"/>&nbsp;
              <label htmlFor="gents">Men's Clothing</label>
            </div>
            <div className="checkbox-container">
              <input className="larger" 
                  value="ladies"
                  onChange={()=> handleSearchByCategory("ladies")}
                  type="checkbox" 
                  id="ladies" 
                  name="ladies"/>&nbsp;
              <label htmlFor="ladies">Women's Clothing</label>
            </div>
            <div className="checkbox-container">
              <input className="larger"
                  value="jewelery" 
                  onChange={()=> handleSearchByCategory("jewelery")}
                  type="checkbox" 
                  id="jewelery" 
                  name="jewelery"/>&nbsp;
              <label htmlFor="jewelery">Jewelery</label>
            </div>
            <div className="checkbox-container">
              <input className="larger"
                  value="electronics"
                  onChange={()=> handleSearchByCategory("electronics")}
                  type="checkbox" 
                  id="electronics" 
                  name="electronics"/>&nbsp;
              <label htmlFor="electronics">Electronics</label>
            </div>
          </div>
        </form>
      </aside>
      {/* search input */}
      <div className="search-form">
          <input type="search" 
          placeholder="Search By Name" 
          defaultValue={filterData}
          onChange={(e)=> handleSearch(e)}/>
      </div>
      {/* list all products */}
      <div className="product-grid">
        {products.map((prod,i)=> (
          <div className="product-container" key={i}>
            <div className="productimage-container">
                <img src={prod.image}
                    alt="Product" 
                    width="100%" 
                    height="100%"/>
            </div>
            <div className="product-details">
                <div className="product-name">
                    <p>{prod.name}</p>
                </div>
                <div className="product-options">
                    <p>₹ {prod.price}</p>
                </div>
                <button 
                  className="productadd-button" 
                  title="Add to Cart" 
                  onClick={()=> handleAddToCart(prod)}>
                    Add To Cart
                </button>
            </div>
          </div>
        ))}
      </div>
      </>
      }
    </div>
    <ToastContainer />
    </>
  )
}

export default Home