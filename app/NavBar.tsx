import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link href="/pages/customers" className="text-gray-700 hover:text-black">Customers</Link>
          </li><li>
            <Link href="/pages/products/" className="text-gray-700 hover:text-black">Products</Link>
          </li><li>
            <Link href="/pages/stores" className="text-gray-700 hover:text-black">Stores</Link>
          </li><li>
            <Link href="/pages/sales" className="text-gray-700 hover:text-black">Sales</Link>
          </li>
          <li>
            <Link href="/pages/cart" className="text-gray-700 hover:text-black">Cart</Link>
          </li>
          <li>
            <Link href="/pages/checkout" className="text-gray-700 hover:text-black">Check Out</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}