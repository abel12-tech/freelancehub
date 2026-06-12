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
    <div className="card p-5 hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-sky-200 flex items-center justify-center text-sky-800 font-bold">{name.charAt(0)}</div>
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-muted">@{username}</p>
        </div>
      </div>

      <p className="mt-3 text-gray-700">{email}</p>
    </div>
  );
}