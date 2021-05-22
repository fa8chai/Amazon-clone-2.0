import { StarIcon, PlusIcon, MinusIcon } from "@heroicons/react/solid";
import Image from "next/image";
import {XCircleIcon} from "@heroicons/react/outline";
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket, remove } from "../slices/basketSlice";

function CheckoutProduct({ id, title, price, rating, description, category, image, hasPrime, num }) {
    const dispatch = useDispatch();

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }))
    };
    const removeProduct = () => {
        dispatch(remove({ id }))
    }
    const addItemToBasket = () => {
        const product = {
            id,
            title, 
            price,
            rating,
            description, 
            category, 
            image,
            hasPrime
        }
        dispatch(addToBasket(product));
    }
    return (
        <div className='grid grid-cols-5 relative'>
            <XCircleIcon className='absolute top-2 left-2 h-6 text-red-500 cursor-pointer' onClick={removeProduct} />
            <Image 
                src={image}
                height={200}
                width={200}
                objectFit='contain'
            />
            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className='flex'>
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon className='h-5 text-yellow-500' />
                    ))}
                </div>
                <p class='text-xs my-2 line-clamp-3'>{description}</p>
                <Currency quantity={price} />
                {hasPrime && (
                    <div className='flex items-center space-x-2'>
                        <img 
                            loading='lazy'
                            className='w-12'
                            src='https://links.papareact.com/fdw'
                            alt=''
                        />
                        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                )}
            </div>

            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <PlusIcon className='h-5 text-yellow-500 cursor-pointer' onClick={addItemToBasket} />
                <div>{num}</div>
                <MinusIcon className='h-5 text-yellow-500 cursor-pointer' onClick={removeItemFromBasket} />
            </div>
        </div>
    )
}

export default CheckoutProduct
