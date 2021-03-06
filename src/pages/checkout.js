import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems } from "../slices/basketSlice";
import Currency from 'react-currency-formatter';
import { useSession } from "next-auth/client";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Head from "next/head";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function Checkout({categories}) {
    const items = useSelector(selectItems);
    const [session] = useSession();
    const total = useSelector(state => state.basket.items.reduce((total, item) => total + item.price * item.quantity , 0));
    const totalItems = useSelector(state => state.basket.items.reduce((total, item) => total + item.quantity , 0));
    const [filteredCategories, setCategories] = useState(categories);

    const filterCategories = (searchText) => {
        const matchedCategories = categories.filter((category) =>
            category.toLowerCase().includes(searchText.toLowerCase())
        );
        setCategories([...matchedCategories]);
    }
    const createCheckoutSession = async () => {
        const stripe = await stripePromise;
        const CheckoutSession = await axios.post('/api/create-checkout-session', {
            items,
            email: session.user.email
        });

        const result = await stripe.redirectToCheckout({
            sessionId: CheckoutSession.data.id
        });

        if(result.error) alert(result.error.message);
    

    }
    return (
        <div className='bg-gray-100 flex h-full'>
            <Head>
                <title>Amazon 2.0 | Checkout</title>
            </Head>
            <Sidebar categories={filteredCategories} onSearchValue={filterCategories} />
            <div className='w-full'>
            <Header />
            <main className='lg:flex max-w-screen-2xl mx-auto'>
                <div className='flex-grow m-5 shadow-sm'>
                    <Image 
                        src='https://links.papareact.com/ikj'
                        width={1020}
                        height={250}
                        objectFit='contain'
                    />
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length === 0 ? 'Your Amazon Basket is Empty':'Shopping Basket'}
                            </h1>

                        {items.map((item, i) => (
                            <CheckoutProduct 
                            key={i}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            description={item.description} 
                            category={item.category}
                            image={item.image}
                            quantity={item.quantity}
                            rating={item.rating}
                            hasPrime={item.hasPrime}
                            />
                        ))}
                    </div>
                </div>

                <div className='flex flex-col bg-white p-10 shadow-md '>
                    {items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap'>Subtotal ({totalItems} items):{' '}
                                <span className='font-bold'>
                                    <Currency quantity={total} />
                                </span>
                            </h2>
                            <button role='link' onClick={createCheckoutSession} disabled={!session} className={` button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
                            </button>

                        </>
                    )}
                </div>
            </main>
            </div>
        </div>
    )
}

export default Checkout
export async function getServerSideProps(context){
    const categories = await fetch('https://fakestoreapi.com/products/categories').then(res => res.json())

    return { props: {
      categories: categories
    } 
  }
  
  }
  