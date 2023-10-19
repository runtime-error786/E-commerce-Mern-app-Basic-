import React, { useEffect } from "react";
import axios from "axios";
function Purchase()
{
    const config = {
        withCredentials: true, // Include withCredentials in the configuration
      };
      useEffect(()=>{
        async function GH()
        {
            try
            {
    
                const url = `http://localhost:2001/purchase`;
                        let g = await axios.delete(url,config);
            }
            catch(err)
            {
    
            }
        }
        GH();
      },[]);
   
}

export {Purchase};