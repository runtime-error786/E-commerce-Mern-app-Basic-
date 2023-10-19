import axios from "axios";
import React, { useEffect, useState } from "react";

function Car({ name, category, qty, pic, price }) {
    const [quantity, setQuantity] = useState(0);
    let [name1,setname] = useState(name);
    let [category1,setcat]=useState(category);
    let [qty1,setqty]=useState(qty);
    let [pic1,setpic]=useState(pic);
    let [price1,setpr]=useState(price);

    let post = async()=>{
        try{
          if(qty1!=0)
          {
            const response1 = await axios.get("http://localhost:2001/cook",{withCredentials:true});
            let r = response1.data;
            console.log("sszzzs",response1.data);
            const response = await axios.post("http://localhost:2001/cart",{name1,category1,quantity,pic1,price1,r});
            console.log("sss");
          }

        }
        catch(err)
        {

        }

    }

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
      <div className="mx-2 my-2 card" style={{ width: "22rem", display: "inline-block" }}>
        <img src={pic1} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">Name: {name1}</h5>
          <p className="card-text">Category: {category1}</p>
          <p className="card-text">Quantity: {qty1} &nbsp;&nbsp;&nbsp;&nbsp; Price: {price1}</p>
          <div className="quantity-control">
            <button className="decrement-button" onClick={decrement}>-</button>
            <span className="quantity ">{quantity}</span>
            <button className="increment-button" onClick={increment}>+</button>
          <button className="add-to-cart-button ms-2" onClick={post}>Add to Cart</button>
          </div>
        </div>
      </div>
    );
  }

function Cuscard(props) {
  const [data, setData] = useState([]);

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

  return (
    <div>
      {data.map((item, index) => (
  (item.name.includes(props.msg) )? (
   
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

export { Cuscard };
