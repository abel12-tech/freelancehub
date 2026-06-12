import UserCard from "@/components/UserCard";
import { UserCardProps } from "@/components/UserCard";

export default async function SkillsPage() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: UserCardProps[] = await res.json();
    return (
        <div className="container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Popular Skills</h1>
                    <p className="page-subtitle">
                        Explore professionals across industries and specialties.
                    </p>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map(user => (
                    <UserCard key={user.id} {...user} />
                ))}
            </div>
        </div>
    );
}
