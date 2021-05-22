import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from 'react-currency-formatter';
import { useSession } from "next-auth/client";
import { groupBy } from "../functions";

function Checkout() {
    const items = useSelector(selectItems);
    const [session] = useSession();
    const total = useSelector(state => state.basket.items.reduce((total, item) => total + item.price , 0));
    const grouped = groupBy(items, product => product.id);
    const groupedProducts = Array.from(grouped).map(gr => ({
        id:gr[0],
        products: gr[1]
    }));

    return (
        <div className='bg-gray-100'>
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

                        {groupedProducts.map((productsId, i) => (
                            <CheckoutProduct 
                            key={i}
                            id={productsId.products[0].id}
                            title={productsId.products[0].title}
                            price={productsId.products[0].price}
                            rating={productsId.products[0].rating}
                            description={productsId.products[0].description} 
                            category={productsId.products[0].category}
                            image={productsId.products[0].image}
                            hasPrime={productsId.products[0].hasPrime}
                            num={productsId.products.length}
                            />
                        ))}
                    </div>
                </div>

                <div className='flex flex-col bg-white p-10 shadow-md '>
                    {items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap'>Subtotal ({items.length} items):{' '}
                                <span className='font-bold'>
                                    <Currency quantity={total} />
                                </span>
                            </h2>
                            <button disabled={!session} className={` button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
                            </button>

                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout
