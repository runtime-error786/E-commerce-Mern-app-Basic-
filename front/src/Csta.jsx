import axios from "axios";
import React, { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Car({ name, category, qty, pic, price }) {
    const [quantity, setQuantity] = useState(1);
    let [name1,setname] = useState(name);
    let [category1,setcat]=useState(category);
    let [qty1,setqty]=useState(qty);
    let [pic1,setpic]=useState(pic);
    let [price1,setpr]=useState(price);

    const increment = () => {
        if(quantity<qty1)
        {
            setQuantity(quantity + 1);
        }
      
    };
  
    const decrement = () => {
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    };
  
    return (
      <div className="mx-3 my-3 card" style={{ width: "22rem", display: "inline-block" }}>
        <img src={pic1} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">Name: {name1}</h5>
          <p className="card-text">Category: {category1}</p>
          <p className="card-text">Quantity: {qty1} &nbsp;&nbsp;&nbsp;&nbsp; Price: {price1}</p>
          <div className="quantity-control">
            <button className="decrement-button" onClick={decrement}>-</button>
            <span className="quantity ">{quantity}</span>
            <button className="increment-button" onClick={increment}>+</button>
          <button className="add-to-cart-button ms-2">Add to Cart</button>
          </div>
        </div>
      </div>
    );
  }


function CSta(props) {
  const validCategories = ["stationary", "grocery", "electronics", "fastfood"];
  let data1 = "false";
  const [data, setData] = useState([]);
  let {name} = useParams();
  console.log("param:",name);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:2001/chome",{withCredentials:true});
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
if(validCategories.includes(name.toLowerCase()))
{
  console.log(props.msg);

  return (
    <div>
      {data.map((item, index) => (
  (item.category == name && item.name.includes(props.msg) )? (
   
    <Car
      key={index}
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
else{
  return <Navigate to="/error" />;
}
}

export { CSta };
