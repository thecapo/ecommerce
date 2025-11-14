import UsersList from "@/app/lists/users/UsersList";

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const response = await fetch(`${process.env.BASE_URL}` + '/api/users'); // do not use the link provided by github codespace. The .app.github.dev domain is typically a preview URL, and not all routes may be accessible externally from your server runtime.
  const users = await response.json();
  const { users: userList } = users; // so when passing to UserList component we will not be typing user.user

  const response2 = await fetch(`${process.env.BASE_URL}` + '/api/users/2/cart', {
    cache: 'no-cache',
  });
  const cartUsers = await response2.json();

  return (
    <div className="container mx-auto p-8"> 
      <h1 className="text-4xl font-bold mb-8">Users</h1> 
      <UsersList users={userList} initialCartUsers={cartUsers} />
    </div>
  );
}