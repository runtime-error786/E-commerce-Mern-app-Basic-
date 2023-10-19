import axios from "axios";
import React, { useEffect, useState } from "react";

function Car({ name, category, qty, pic ,price}) {
  return (
<div className="mx-2 my-2 card" style={{ width: "22rem", display: "inline-block" }}>
      <img src={pic} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">Name : {name}</h5>
        <p className="card-text"> Category: {category}</p>
        <p className="card-text"> Quantity: {qty}</p>
        <p className="card-text"> Price: {price}</p>

      </div>
    </div>
  );
}

function Card(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:2001/home",{withCredentials:true});
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

export { Card };
