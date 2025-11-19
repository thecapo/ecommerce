import SalesList from "@/app/lists/sales/SalesList";

export const dynamic = 'force-dynamic';

export default async function SalesPage() {
  const response = await fetch(`${process.env.BASE_URL}` + '/api/sales'); // do not use the link provided by github codespace. The .app.github.dev domain is typically a preview URL, and not all routes may be accessible externally from your server runtime.
  const sales = await response.json();
  const { sales: saleList } = sales; // so when passing to SaleList component we will not be typing sale.sale

  const response2 = await fetch(`${process.env.BASE_URL}` + '/api/users/2/cart', {
    cache: 'no-cache',
  });
  const cartSales = await response2.json();

  return (
    <div className="container mx-auto p-8"> 
      <h1 className="text-4xl font-bold mb-8">Sales</h1> 
      <SalesList sales={saleList} initialCartSales={cartSales} />
    </div>
  );
}