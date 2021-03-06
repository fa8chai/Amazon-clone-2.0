import Product from "./Product"


function ProductFeed({ products }) {
    return (
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
            {products.slice(0, 4).map(({ id, title, price, description, category, image, quantity, rating, hasPrime }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    quantity={quantity}
                    rating={rating}
                    hasPrime={hasPrime}
                />
            ))}
            <img className='md:col-span-full mx-auto' src='https://links.papareact.com/ikj' />

            <div className='md:col-span-2'>
                {products.slice(4, 5).map(({ id, title, price, description, category, image, quantity, rating, hasPrime }) => (
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                        quantity={quantity}
                        rating={rating}
                        hasPrime={hasPrime}
                    />
                ))}
            </div>
            {products.slice(5, products.length).map(({ id, title, price, description, category, image, quantity, rating, hasPrime }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    quantity={quantity}
                    rating={rating}
                    hasPrime={hasPrime}
                />
            ))}

        </div>
    )
}

export default ProductFeed

