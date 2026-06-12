// user card
export type UserCardProps = {
  id: number;
  name: string;
  company: {
    name: string;
  };
};

export default function UserCard({ id, name, company }: UserCardProps) {
  return (
    <div className="card card-hover p-5">
      <div className="flex items-center gap-3">
        <div className="avatar">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold truncate">{name}</h2>
          <p className="text-sm text-muted truncate">{company.name}</p>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-[var(--card-border)]">
        <span className="badge badge-neutral">ID {id}</span>
      </div>
    </div>
  );
}
