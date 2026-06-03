import FreelancerList from "@/components/freelancers/freelancer-list";

async function getFreelancers() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch freelancers");
  }

  return res.json();
}

export default async function FreelancersPage() {
  const freelancers = await getFreelancers();

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">
        Freelancers
      </h1>

      <FreelancerList freelancers={freelancers} />
    </div>
  );
}