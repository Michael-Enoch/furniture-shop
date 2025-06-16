import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import AOS from "aos"
import 'aos/dist/aos.css'
import theme from '../context/Theme.jsx'


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
        <div className="p-20 flex flex-col gap-10">
            <h2
                data-aos='fade-up'
                className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 tracking-tight flex justify-center"
                style={{
                    color: theme.colors.text.primary,
                    fontFamily: theme.fonts.header,
                }}
            >
                Featured Categories
            </h2>
            <div className='grid grid-cols-3 gap-8 w-full' >
                
                {
                    categories.map((category) =>(
                        <Link data-aos='fade-up'  to='/' className="flex flex-col gap-2 font-normal" key={category.id}>
                            <img className="w-full h-80" src={category.image} alt="" />
                            <p className="text-xl flex justify-center">{category.name}</p>
                        </Link>
                    ))
                    
                }
            </div>
        </div>
        </>
    )
}

export default CategoriesSection