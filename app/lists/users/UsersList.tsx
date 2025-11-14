'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IUser } from "@/app/schemas/userSchema";

export default function UsersList({ users, initialCartUsers = [] }: { users: IUser[], initialCartUsers: IUser[] }) {
  const [cartUsers, setCartUsers] = useState(initialCartUsers)
  
  async function addToCart(userId: string) {
    const response = await fetch(`${process.env.BASE_URL}` + '/api/users/2/cart', {
      method: 'POST',
      body: JSON.stringify({
        userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const updatedCartUsers = await response.json();
    setCartUsers(updatedCartUsers);
  }

  async function removeFromCart(userId: string) {
    const response = await fetch(`${process.env.BASE_URL}` + '/api/users/2/cart', {
      method: 'DELETE',
      body: JSON.stringify({
        userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const updatedCartUsers = await response.json();
    setCartUsers(updatedCartUsers);
  }

  function userIsInCart(userId: string) {
    return cartUsers.some(cp => cp.id === userId);
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {users.map(user => (
        <Link
          key={user.id}
          href={`/users/${user.id}`}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
        >
          <div className="flex justify-center mb-4 h-48 relative"> {/* Added height and relative positioning */}
            <Image
              src={'/' + user.imageUrl}
              alt="User image"
              fill // Fill the container
              unoptimized
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-md" // Cover the container, maintaining aspect ratio
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </Link>
      ))}
    </div>
  );
}