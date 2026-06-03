interface Props {
  params: Promise <{
    jobId: string | number;
  }>;
}

export default   async function JobPage({ params }: Props) {
    const { jobId } = await params;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Job Details for Job ID: {jobId}
      </h1>
    </div>
  );
}