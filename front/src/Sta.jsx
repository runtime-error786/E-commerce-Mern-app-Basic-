import axios from "axios";
import React, { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
function Car({ name, category, qty, pic ,price}) {
  return (
    <div className="mt-5 ms-5 mb-5 me-5 card" style={{width: "18rem",display:"inline-block" }}>
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

function Sta(props) {
  const validCategories = ["stationary", "grocery", "electronics", "fastfood"];
  let data1 = "false";
  const [data, setData] = useState([]);
  let {name} = useParams();
  console.log("param:",name);
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

export { Sta };
