import moment from 'moment';
import Currency from 'react-currency-formatter';

function Order({ id, amount, amountShipping, items, timestamp, images }) {
    return (
        <div className='relative border rounded-md'>
            <div className='flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600'>
                <div>
                    <p className='font-bold text-xs'>ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format('DD MM YYYY')}</p>
                </div>
                <div className='text-xs font-bold'>
                    <p>TOTAL</p>
                    <p>
                        <Currency quantity={amount} />
                        * Next Day Delivery{' '}
                        <Currency quantity={amountShipping} />
                    </p>
                </div>
                <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>{items.length > 1 ? `${items.length} items` : `${items.length} item`} </p>
                <p className='absolute top-2 right-2 w-40 lg:w72 truncate text-xs whitespace-nowrap'>
                    ORDER # {id}
                </p>
            </div>

            <div className='p-5 sm:p-10'>
                <div className='flex space-x-6 overflow-x-auto'>
                    {images.map(image => (
                        <div className='relative'>
                            <img className='h-20 object-contain sm:h-32' src={image} alt='' />
                            {items?.map(item => (
                                <span className='absolute top-0 left-0 h-4 w-4 text-center rounded-full text-yellow z-30'>{item.quantity}</span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default Order
