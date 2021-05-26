import { getSession } from "next-auth/client";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  const [filteredProducts, setProducts] = useState(products);

  const filterProducts = (searchText) => {
      const matchedProducts = products.filter((product) =>
          product.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setProducts([...matchedProducts]);
  }
  return (
    
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header onSearchValue={filterProducts} />
      <main className='max-w-screen-2xl mx-auto'>
        <Banner />
        {filteredProducts.length > 0 ? (
                    <ProductFeed products={filteredProducts} />
                ) : (
                    <h1 className="text-center text-2xl py-4">
                        🙁 No matching products…
                    </h1>
                )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context){
  const products = await fetch('https://fakestoreapi.com/products').then(res => res.json())
  const MAX_RATING = 5;
  const MIN_RATING = 1;
  const getRating = () => {
    return Math.floor(Math.random() * (MAX_RATING - MIN_RATING +1)) + MIN_RATING
  } 
  const getPrime = () => {
    return Math.random() < 0.5
  }
  
  return { props: {
    products: products.map(product => (
      {...product, 
        quantity: 0, rating: getRating(), hasPrime: getPrime() }
    ))
  } }

}
