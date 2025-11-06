import ProductsList from "@/app/lists/products/ProductsList";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const response = await fetch(`${process.env.BASE_URL}` + '/api/products'); // do not use the link provided by github codespace. The .app.github.dev domain is typically a preview URL, and not all routes may be accessible externally from your server runtime.
  const products = await response.json();
  const { products: productList } = products; // so when passing to ProductList component we will not be typing product.product

  const response2 = await fetch(`${process.env.BASE_URL}` + '/api/users/2/cart', {
    cache: 'no-cache',
  });
  const cartProducts = await response2.json();

  return (
    <div className="container mx-auto p-8"> 
      <h1 className="text-4xl font-bold mb-8">Products</h1> 
      <ProductsList products={productList} initialCartProducts={cartProducts} />
    </div>
  );
}