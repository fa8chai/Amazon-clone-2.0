import { useSelector } from "react-redux";
import { selectCategory, selectProducts } from "../../slices/basketSlice";
import Router from 'next/router'
import { useEffect, useState } from 'react';
import Head from "next/head";
import ProductFeed from "../../components/ProductFeed";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

function CategoryPage({ categories }) {
    const products = useSelector(selectProducts);
    const category = useSelector(selectCategory);
    const [loaded,setLoaded] = useState(false)

    const categoryProducts = products?.filter(product => product.category === category);
    
    const [filteredCategories, setCategories] = useState(categories);
    const filterCategories = (searchText) => {
        const matchedCategories = categories.filter((category) =>
            category.toLowerCase().includes(searchText.toLowerCase())
        );
        setCategories([...matchedCategories]);
    }
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
        <div className='h-full flex'>
            <Head>
                <title>Amazon 2.0 | {category}</title>
            </Head>
            <Sidebar categories={filteredCategories} onSearchValue={filterCategories} />
            <div className='w-full'>
                <Header />
                <main className='max-w-screen-2xl mx-auto mt-10 pt-2'>
                    <div className='mb-10'></div>
                {categoryProducts?.length > 0 ? (
                    <ProductFeed products={categoryProducts} />
                ) : (
                    <h1 className='text-center mx-auto text-2xl py-4'>No products…</h1>
                )}
            </main>
            </div>
        </div>
    )
}

export default CategoryPage
export async function getServerSideProps(context){
    const categories = await fetch('https://fakestoreapi.com/products/categories').then(res => res.json())
    
    return { props: {
      categories: categories
    } 
  }
  
  }