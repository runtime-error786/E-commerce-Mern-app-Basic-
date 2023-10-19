import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function Car({ k ,name, category, qty, pic, price}) {
    const [quantity, setQuantity] = useState(qty);
    let [name1,setname] = useState(name);
    let [category1,setcat]=useState(category);
    let [qty1,setqty]=useState();
    let [pic1,setpic]=useState(pic);
    let [price1,setpr]=useState(price);
    let [m,setm]=useState(k);
    const navigate = useNavigate();
    useEffect(()=>{
        async function aq()
        {
            let r = await axios.get("http://localhost:2001/getcount", {
            params:{
                name1,category1,price1
            }
          });
            console.log("((((((((((((((((((((((",r.data.qty);
            setqty(r.data.qty);
        }
        aq();
    },[]);
    

    const config = {
      withCredentials: true, // Include withCredentials in the configuration
    };

    let post = async (e) => {
      try {
        console.log("ssnn");
        const url = `http://localhost:2001/delcartitem?name=${name1}&cat=${category1}&price=${price1}`;
        console.log("ssnn2");
    
        let a = await axios.delete(url, config);
        console.log("ssnn3", a.data);
    
        console.log("zzz");
        console.log("yyy", e.target.value);
        // window.location.reload();
        document.getElementById(e.target.value).remove();
      } catch (err) {
        console.log(err);
      }
    }
    
    const increment = () => {
      async function fg()
      {
        try{
            
          if(quantity<qty1)
          {
              let updatedQuantity = quantity + 1;
              setQuantity(updatedQuantity);
              console.log("AAA",quantity);
              let r = quantity+1;
              let r1 = await axios.get("http://localhost:2001/crement", {
          params:{
              name1,category1,price1,r
          },withCredentials:true
        });
              console.log("BBB",quantity);

          }
      }
      catch(err)
      {
          console.log("something went wrong");
      }
      }
       fg();
    };
  
    const decrement = async() => {
        try{
            
            if(quantity>0)
            {
                let updatedQuantity = quantity - 1;
                setQuantity(updatedQuantity);
                console.log("AAA",quantity);
                let r = quantity-1;

                let r1 = await axios.get("http://localhost:2001/crement", {
            params:{
                name1,category1,price1,r
            },withCredentials:true
          });
            }
        }
        catch(err)
        {
            alert("something went wrong 2");
        }
    };
  
    return (
        
      <div className="mx-2 my-2 card" id={m}  style={{ width: "22rem", display: "inline-block" }}>
        <img src={pic1} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">Name: {name1}</h5>
          <p className="card-text">Category: {category1}</p>
          <p className="card-text">Quantity: {qty1} &nbsp;&nbsp;&nbsp;&nbsp; Price: {price1}</p>
          <div className="quantity-control">
            <button className="decrement-button" onClick={decrement}>-</button>
            <span className="quantity ">{quantity}</span>
            <button className="increment-button" onClick={increment}>+</button>
          <button className="add-to-cart-button ms-2" value={m} onClick={post}>Drop</button>
          </div>
        </div>
      </div>
    );
  }

  function Showcart(props) {
    const [data, setData] = useState([]);
    let [fl,setfl] = useState("false");
    
    useEffect(() => {
      
      async function fetchData() {
        try {
          let response = await axios.get("http://localhost:2001/showcart", {
            withCredentials: true
          });
          console.log("MMMMMMMMMMMM",response.data.cart);
          if(response.data=="err")
          {
            console.log("za");
          }
          
          else if( response.data.cart.length>0)
          {
            setData(response.data.cart);
            console.log("Data from the server:", response.data.cart.length);
            setfl("true");
          }
          
          // Instead of using a separate variable 'r', set the data directly in the state.
        } catch (err) {
          console.log(err);
        }
      }
  

      fetchData();
    }, []);
  
    console.log("Data in the component:", data); // Add this log to see the state value.
  
    return (
      <div>
        {data.map((item, index) => (
          item.name.includes(props.msg) ? (
            <Car
              key={item._id}
              k = {index}
              name={item.name}
              category={item.category}
              qty={item.qty}
              pic={item.pic}
              price={item.price}

            />
          ) : null
        ))}
      </div>
    );
  }
  
  export { Showcart };
  
