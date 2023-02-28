import React from "react";
import {BASE_API} from "../app/index"
import axios from "axios"
const Http = axios.create({
    baseURL: BASE_API,
})
export default Http