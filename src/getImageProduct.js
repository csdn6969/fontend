import React from "react";
import { BASE_URL } from "./app/index";
const GetImageProduct = (image)=>{
   return `${BASE_URL}/assets/uploads/products/${image}`
}
export default GetImageProduct