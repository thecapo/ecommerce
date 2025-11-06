import ShoppingCartList from "@/app/pages/cart/ShoppingCartList";

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  // const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/users/2/cart', {
  const response = await fetch('https://bug-free-adventure-qjjj64vwj7cjqv-3000.app.github.dev' + '/api/users/2/cart', {
    
    cache: 'no-cache',
  });
  const cartProducts = await response.json();

  return (
    <ShoppingCartList initialCartProducts={cartProducts} />
  );
}