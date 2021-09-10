import axios from "axios"
import { useQuery } from "react-query"
import { IProduct } from "../types"

export const useAllProducts = () => {
  const { data, isLoading, isError } = useQuery('allproducts', async():Promise<IProduct[]> => {
    const res = await axios.get('/api/products')
    return res.data;
  })
  const products=data as IProduct[]
  return {products,isLoading,isError}
}

export const useOneProduct = (id:string) => {
  const { data, isLoading, isError } = useQuery('product', async():Promise<IProduct> => {
    const res = await axios.get(`/api/products/${id}`)
    return res.data;
  })
  const product = data as IProduct
  return {product,isLoading,isError}
}