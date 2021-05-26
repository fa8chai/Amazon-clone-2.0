import Image from 'next/image';
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon,
} from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';
import { setCollapsed } from "../slices/basketSlice";


function Header({ onSearchValue }) {
    const [session] = useSession();
    const router = useRouter();
    const items = localStorage.getItem('items'); 
    const dispatch = useDispatch();

    return (
        <header className='sticky top-0 left-0 right-0 z-50'>
            <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
                <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
                    <Image
                        onClick={() => router.push('/')}
                        src='https://links.papareact.com/f90'  
                        width={150}
                        height={40}
                        objectFit='contain'
                        className='cursor-pointer'
                    />
                </div>

                <div className="hidden sm:flex items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 flex-grow cursor-pointer">
                    <input
                        type="text"
                        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
                        placeholder={
                            router.route === "/"
                                ? "Search products…"
                                : ""
                        }
                        onInput={(event) =>
                            router.route === "/" &&
                            onSearchValue(event.target.value)
                        }
                    />
                    <SearchIcon className="h-12 p-4" />
                </div>
                <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                <div className='link' onClick={!session ?signIn: signOut}>
                    <p>
                    {session ? `Hello, ${session.user.name}`:
                    'Sign in'}
                    </p>
                    <p className='font-extrabold md:text-sm'>Account & Lists</p>
                </div>
                <div onClick={() => router.push('/orders')} className='link'>
                    <p>Returns</p>
                    <p className='font-extrabold md:text-sm'>& Orders</p>
                </div>
                <div onClick={() => router.push('/checkout')} className='relative link flex items-center'>
                    {items.length > 0 ? (
                        <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>{items.length}</span>
                             ): (
                                <span></span>
                            )
                    }
                    <ShoppingCartIcon  className='h-10'/>
                    <p className='hidden md:inline mt-2 font-extrabold md:text-sm '>Basket</p>
                </div>
            </div>
            </div>
            
            <div className='flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm'>
                <p className='link'>
                    <MenuIcon className='h-6 mr-1' onClick={() => dispatch(setCollapsed(false))} />
                    All
                </p>
                <p className='link'>Prime Video</p>
                <p className='link'>Amazon Business</p>
                <p className='link'>Today's Deals</p>
                <p className='link hidden lg:inline-flex'>Electronics</p>
                <p className='link hidden lg:inline-flex'>Food & Grocery</p>
                <p className='link hidden lg:inline-flex'>Prime</p>
                <p className='link hidden lg:inline-flex'>Buy Again</p>
                <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
                <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
            </div>
        </header>
    )
}

export default Header


