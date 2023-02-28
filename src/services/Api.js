import Http from "./Http"

export const getProducts =(config)=>{
    return Http.get("/products", config);
}
export const getProduct = (id, config)=>{
    return Http.get(`/products/${id}`);
}
export const getCategories = (config)=>{
    return Http.get("/categories");
}
export const getCategory = (id, config)=>{
    return Http.get(`/categories/${id}`);
}
export const getProductsCategory = (id, config)=>{
    return Http.get(`/categories/${id}/products`);
}
export const getComment =(id, config)=>{
    return Http.get(`/products/${id}/comments`, config)
}
export const createComment =(id, data)=>{
    return Http.post(`/products/${id}/comments`, data);
}
export const Order = (config, data)=>{
    return Http.post("/order", config, data);
}