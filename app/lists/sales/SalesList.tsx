'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ISale } from "@/app/schemas/saleSchema";

export default function SalesList({ sales, initialCartSales = [] }: { sales: ISale[], initialCartSales: ISale[] }) {
  const [cartSales, setCartSales] = useState(initialCartSales)

  async function addToCart(saleId: string) {
    const response = await fetch(`${process.env.BASE_URL}` + '/api/users/2/cart', {
      method: 'POST',
      body: JSON.stringify({
        saleId,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const updatedCartSales = await response.json();
    setCartSales(updatedCartSales);
  }

  async function removeFromCart(saleId: string) {
    const response = await fetch(`${process.env.BASE_URL}` + '/api/users/2/cart', {
      method: 'DELETE',
      body: JSON.stringify({
        saleId,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const updatedCartSales = await response.json();
    setCartSales(updatedCartSales);
  }

  function saleIsInCart(saleId: string) {
    return cartSales.some(cp => cp.id === saleId);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {sales.map(sale => (
        <Link
          key={sale.id}
          href={`/sales/${sale.id}`}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
        >
          <div className="flex justify-center mb-4 h-48 relative"> {/* Added height and relative positioning */}
            <Image
              src={'/' + sale.imageUrl}
              alt="Sale image"
              fill // Fill the container
              unoptimized
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-md" // Cover the container, maintaining aspect ratio
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">{sale.id}</h2>
          <p className="text-gray-600">{sale.product[0].name}</p>
          <p className="text-gray-600">{sale.user[0].name}</p>
          <p className="text-gray-600">{sale.store[0].name}</p>
          {saleIsInCart(sale.id)
            ? (
              <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={(e) => {
                e.preventDefault();
                removeFromCart(sale.id);
              }}>Remove from Cart</button>
            ) : (
              <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={(e) => {
                e.preventDefault();
                addToCart(sale.id);
              }}>Add to Cart</button>
            )}
        </Link>
      ))}
    </div>
  );
}