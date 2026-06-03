interface Props {
  name: string;
  username: string;
  email: string;
}

export default function FreelancerCard({
  name,
  username,
  email,
}: Props) {
  return (
    <div className="border rounded-lg p-5 hover:shadow-md transition">
      <h2 className="text-2xl font-semibold">{name}</h2>

      <p className="text-gray-500 mt-1">@{username}</p>

      <p className="mt-2 text-gray-700">{email}</p>
    </div>
  );
}