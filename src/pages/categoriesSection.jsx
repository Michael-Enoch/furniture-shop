import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import AOS from "aos"
import 'aos/dist/aos.css'


const CategoriesSection = () => {
    useEffect(()=>{
        AOS.init({
            duration: 1000,
            once: false,
            easing: 'ease-in-out'
        })
    }, [])
    
    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')

    useEffect(()=>{
        const fetchCategories = async () =>{
            try{
                const BASE_URL = "/categories.json"
                const response = await axios.get(BASE_URL)
                const data = response.data
                const fetchedCategories = data.categories

                setCategories(fetchedCategories)
            }catch(err){
                console.log(err);

                setError('failed to fetch categories', err)
            }
        }

        fetchCategories()
    }, [])

    return (
        <>
        <div className="px-20 pt-20 py-10 flex flex-col gap-10">
            <h1 data-aos='fade-up' className="text-3xl flex justify-center">Featured Categories</h1>
            <div className='grid grid-cols-2 gap-8 w-full' >
                
                {
                    categories.map((category) =>(
                        <Link data-aos='fade-up'  to='/' className="flex flex-col gap-2 font-normal" key={category.id}>
                            <img className="w-full h-80" src={category.image} alt="" />
                            <p>{category.name}</p>
                        </Link>
                    ))
                    
                }
            </div>
        </div>
        </>
    )
}

export default CategoriesSection