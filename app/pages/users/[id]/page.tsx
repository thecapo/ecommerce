import NotFoundPage from "@/app/not-found";

export const dynamic = 'force-dynamic';

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const response = await fetch(`${process.env.BASE_URL}` + '/api/users/' + params.id);
  const user = await response.json();

  if (!user) {
    return <NotFoundPage/>
  }

  return (
    <div className="container mx-auto p-8 flex flex-col md:flex-row">
      <div className="md:w-1/2 mb-4 md:mb-0 md:mr-8">
        <img
          src={'/' + user.imageUrl}
          alt="User image"
          className="w-full h-auto rounded-lg shadow-md" />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-4">{user.name}</h1>
        <p className="text-2xl text-gray-600 mb-6">{user.email}</p>
      </div>
    </div>
  );
}