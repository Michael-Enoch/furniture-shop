import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Heart } from "lucide-react";

const BestSelling = () =>{

    const [products, setProducts] = useState([])
    const [error, setError] = useState('')
    
        useEffect(()=>{
            const fetchProducts = async () =>{
                try{
                    const BASE_URL = "/products.json"
                    const response = await axios.get(BASE_URL)
                    const data = response.data
                    const fetchedProducts = data.products
    
                    setProducts(fetchedProducts)
                }catch(err){
                    console.log(err);
    
                    setError('failed to fetch products', err)
                }
            }
    
            fetchProducts()
        }, [])

        const filteredProducts = products.filter((product) => product.price > 3000 && product.price < 5000)

    return(
        <>
        <div className='px-20 py-5 pb-10 flex flex-col gap-10'>
            <h1 className="text-3xl flex justify-center">Best Selling Products</h1>
            <div className='grid grid-cols-4 gap-8 w-full'>
                {
                    filteredProducts.slice(0, 4).map((product) =>(
                       <div key={product.id} className='flex flex-col gap-3'>
                           <Link className='w-full' to='/'><img className='h-70 w-full' src={product.image}/></Link>
                           <div className='flex flex-col gap-1.5'>
                               <Link className='text-black hover:text-gray-500 text-transform-capitalize'>{product.name}</Link>
                               <p className='font-medium '>${product.price}</p>
                           </div>
                       </div>
                    ))
                }
            </div>
        </div>
        </>
    )
}

export default BestSelling