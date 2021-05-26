import Image from 'next/image';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { add, addToBasket, remove, removeFromBasket, selectItems, selectProduct, setProduct } from '../../slices/basketSlice';
import Currency from 'react-currency-formatter';
import Head from "next/head";
import { StarIcon, PlusIcon, MinusIcon } from "@heroicons/react/solid";
import Header from '../../components/Header';
import Router from 'next/router'
import { useEffect, useState } from 'react';


function ProductPage() {
    const router = useRouter();
    const { id } = router.query;
    const product = useSelector(selectProduct);
    const items = localStorage.getItem('items');
    const dispatch = useDispatch();
    const [loaded,setLoaded] = useState(false)
    
    const addItemToBasket = () => {
        const index = items?.findIndex(basketItem => basketItem.id === product.id);    

        if (index >= 0) {
            dispatch(add(product))
        }else{
            dispatch(addToBasket(product));
        }
    }
    useEffect(() => {
        if(!product){

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
                <title>Amazon 2.0 | {product?.title}</title>
            </Head>
            <Header />
        <div className='flex flex-col items-center lg:flex-row lg:space-x-4 max-w-screen-lg mx-auto mt-10'>
            <Image
                src={product?.image}
                height={400}
                width={400}
                objectFit='contain'
            />
            <div className='relative flex flex-col p-5 lg:p-10 flex-grow-0'>
                <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{product?.category}</p>
                <h1 className='text-3xl mb-5'>{product?.title}</h1>
                <p className='font-bold mx-5'>
                <Currency
                    quantity={product?.price}
                />
                </p>
                <p className='text-gray-500 my-5'>{product?.description}</p>
                <div className='flex ml-5 z-3'>
                {Array(product?.rating).fill().map((_, i) => (
                    <StarIcon key={i} className='h-5 text-yellow-500' />
                ))}
                </div>
                {product?.hasPrime && (
                <div className='flex items-center space-x-2 -mt-5'>
                    <img className='w-12' src='https://links.papareact.com/fdw' alt='' />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
                )}
                <button onClick={addItemToBasket} className='my-5 button'>Add to Basket</button>
            </div>
            </div>
        </div>
    )
}

export default ProductPage
