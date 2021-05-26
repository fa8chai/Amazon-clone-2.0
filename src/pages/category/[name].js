import { useSelector } from "react-redux";
import { selectCategory, selectProducts } from "../../slices/basketSlice";
import Router from 'next/router'
import { useEffect, useState } from 'react';
import Head from "next/head";

function CategoryPage() {
    const products = useSelector(selectProducts);
    const category = useSelector(selectCategory);
    const [loaded,setLoaded] = useState(false)

    const categoryProducts = products?.filter(product => product.category === category);
    
    useEffect(() => {
        if(!category){

            Router.push('/')
            location.replace("/")
        }else{
            setLoaded(true)
        }
      },[]);

    if(!loaded){
        return <div></div>
    }
  
    return (
        <div>
            <Head>
                <title>Amazon 2.0 | {category}</title>
            </Head>
            <main className='max-w-screen-2xl mx-auto mt-5'>
                {categoryProducts?.length > 0 ? (
                    <ProductFeed products={categoryProducts} />
                ) : (
                    <h1 className='text-center mx-auto text-2xl py-4'>No products…</h1>
                )}
            </main>
        </div>
    )
}

export default CategoryPage
