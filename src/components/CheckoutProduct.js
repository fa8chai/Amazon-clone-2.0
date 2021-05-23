import { StarIcon, PlusIcon, MinusIcon, XCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { removeFromBasket, remove, add } from "../slices/basketSlice";

function CheckoutProduct({ id, title, price, rating, description, category, image, hasPrime, quantity }) {
    const dispatch = useDispatch();

    const removeItemFromBasket = () => {
        if (quantity > 1) {
            dispatch(removeFromBasket({ id }))
        } else {
            dispatch(remove({ id }))
        }
    };
    const removeProduct = () => {
        dispatch(remove({ id }))
    }
    const addProduct = () => {
        const product = {
            id,
            title, 
            price,
            rating,
            description, 
            category, 
            image,
            quantity
        }
        dispatch(add(product));
    }
    return (
        <div className='grid grid-cols-5 relative'>
            <XCircleIcon className='absolute top-0 z-30 left-2 h-5 text-red-500 cursor-pointer' onClick={removeProduct} />
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
                <p className='text-xs my-2 line-clamp-3'>{description}</p>
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
                <PlusIcon className='h-5 text-yellow-500 cursor-pointer' onClick={addProduct} />
                <div className='text-center'>{quantity}</div>
                <MinusIcon className='h-5 text-yellow-500 cursor-pointer' onClick={removeItemFromBasket} />
            </div>
        </div>
    )
}

export default CheckoutProduct
