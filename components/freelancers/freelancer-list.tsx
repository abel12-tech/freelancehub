/* eslint-disable @typescript-eslint/no-explicit-any */
import FreelancerCard from "./freelancer-card";

interface Props {
  freelancers: any[];
}

export default function FreelancerList({ freelancers }: Props) {
  return (
    <div className="space-y-4">
      {freelancers.map((f) => (
        <FreelancerCard
          key={f.id}
          name={f.name}
          username={f.username}
          email={f.email}
        />
      ))}
    </div>
  );
}