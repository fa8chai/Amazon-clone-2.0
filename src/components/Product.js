import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { add, addToBasket, selectItems, setProduct } from "../slices/basketSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

function Product({ id, title, price, description, category, image, quantity, rating, hasPrime }) {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(localStorage.getItem('items'))
    }, [])
    const router = useRouter();

    const product = {
        id,
        title, 
        price,
        description, 
        category, 
        image,
        quantity,
        rating,
        hasPrime,
    }
        
    const addItemToBasket = () => {
        const index = items?.findIndex(basketItem => basketItem.id === product.id);
        if (index >= 0) {
            dispatch(add(product))
        }else{
            localStorage.setItem('items', [...items, {...product, quantity: 1}])
        }
    }
    const handleClick = () => {
        dispatch(setProduct({product}))
        router.push(`/products/${id}`)
    }

    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>
            <Image className='cursor-pointer' onClick={handleClick} src={image} height={200} width={200} objectFit='contain' />
            <h4 className='my-3'>{title}</h4>
            <div className='flex'>
                {Array(rating).fill().map((_, i) => (
                    <StarIcon key={i} className='h-5 text-yellow-500' />
                ))}
            </div>
            <p className='text-xs my-2 line-clamp-2'>{description}</p>

            <div className='mb-5'>
                <Currency
                    quantity={price}
                />
            </div>
            {hasPrime && (
                <div className='flex items-center space-x-2 -mt-5'>
                    <img className='w-12' src='https://links.papareact.com/fdw' alt='' />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )}
            <button onClick={addItemToBasket} className='mt-auto button'>Add to Basket</button>
        </div>
    )
}

export default Product
