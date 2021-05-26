import { getSession } from "next-auth/client";
import db from "../../firebase";
import moment from 'moment';
import Header from '../components/Header';
import Head from "next/head";
import Order from '../components/Order';
import Sidebar from "../components/Sidebar";

function Orders({ orders, session }) {

    return (
        <div className='flex h-full'>
            <Head>
                <title>{session && `${session.user.name}'s`} Orders | Amazon 2.0</title>
            </Head>
            <Sidebar />
            <div className='w-full'>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb- 1 broder-yellow-400'>Your Orders</h1>
                
                {session ? (
                    <h2>{orders.length} Orders</h2>
                ) : 
                (
                    <h2>Please sign in to see your orders</h2>
                )
                }

                <div className='mt-5 space-y-4'>
                    {orders?.map((order) => (
                        <Order
                            key={order.id}
                            id={order.id}
                            amount={order.amount}
                            amountShipping={order.amountShipping}
                            items={order.items}
                            timestamp={order.timestamp}
                            images={order.images}
                        />
                    ))}
                </div>
             
            </main>
            
            </div>
        </div>
    )
}

export default Orders

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    const session = await getSession(context)

    if (!session) {
        return {
            props: {}
        }
    }

    const stripeOrders = await db
        .collection('users')
        .doc(session.user.email)
        .collection('orders')
        .orderBy('timestamp', 'desc')
        .get()

    const orders = await Promise.all(
        stripeOrders.docs.map(async order => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100
                })
            ).data
        }))
    )

    return {
        props: {
            orders,
            session
        }
    }
}