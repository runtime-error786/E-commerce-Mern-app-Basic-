import axios from "axios";
import React, { useEffect, useState } from "react";

function Car({ name, category, qty, pic }) {
  return (
    <div className="mt-5 ms-5 mb-5 me-5 card" style={{width: "18rem",display:"inline-block" }}>
      <img src={pic} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">Name : {name}</h5>
        <p className="card-text"> Category: {category}</p>
        <p className="card-text"> Quantity: {qty}</p>
      </div>
    </div>
  );
}

function Gro() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:2001/home");
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
  item.category == "grocery" ? (
    <Car
      key={index}
      name={item.name}
      category={item.category}
      qty={item.qty}
      pic={item.pic}
    />
  ) : null
))}

    </div>
  );
}

export { Gro };
