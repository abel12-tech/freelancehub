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
    <div className="card card-hover p-5">
      <div className="flex items-center gap-3">
        <div className="avatar">{name.charAt(0).toUpperCase()}</div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold truncate">{name}</h2>
          <p className="text-sm text-muted">@{username}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted truncate">{email}</p>
    </div>
  );
}
