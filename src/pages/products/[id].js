import Image from 'next/image';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { add, addToBasket, remove, removeFromBasket, selectProduct } from '../../slices/basketSlice';
import Currency from 'react-currency-formatter';
import Head from "next/head";
import { StarIcon, PlusIcon, MinusIcon } from "@heroicons/react/solid";
import Header from '../../components/Header';


function ProductPage() {
    const router = useRouter();
    const { id } = router.query;
    const product = useSelector(selectProduct);
    const dispatch = useDispatch();
    
    const removeItemFromBasket = () => {
        if (product.quantity > 1) {
            dispatch(removeFromBasket({ id }))
        } else {
            dispatch(remove({ id }))
        }
    };

    const addProduct = () => {
        dispatch(add(product));
    }
    if(!product){
        return router.push('/');
    }
    return (
        <div>
            <Head>
                <title>Amazon 2.0 | {product.title}</title>
            </Head>
            <Header />
        <div className='flex flex-col items-center md:flex-row max-w-screen-lg mx-auto'>
            <Image
                src={product.image}
                height={300}
                width={300}
                objectFit='contain'
            />
            <div className='relative flex flex-col flex-grow-1 p-5 lg:p-10'>
                <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{product.category}</p>
                <h1 className='text-3xl mb-5'>{product.title}</h1>
                <p className='font-bold mx-5'>
                <Currency
                    quantity={product.price}
                />
                </p>
                <p className='text-gray-500 my-5'>{product.description}</p>
                <div className='flex'>
                {Array(product.rating).fill().map((_, i) => (
                    <StarIcon key={i} className='h-5 text-yellow-500' />
                ))}
                </div>
                {product.hasPrime && (
                <div className='flex items-center space-x-2 -mt-5'>
                    <img className='w-12' src='https://links.papareact.com/fdw' alt='' />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
                )}

                {product.quantity === 0 ? (
                    <button onClick={() => dispatch(addToBasket(product))} className='my-5 button'>Add to Basket</button>

                ) : (
                    <div className='flex items-center space-x-2'>
                        <PlusIcon className='h-5 text-yellow-500 cursor-pointer' onClick={addProduct} />
                        <div className='text-center'>{product.quantity}</div>
                        <MinusIcon className='h-5 text-yellow-500 cursor-pointer' onClick={removeItemFromBasket} />
                    </div>
                )}
            </div>
            </div>
        </div>
    )
}

export default ProductPage
