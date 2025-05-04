import Link from "next/link";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Home | This is a public page.</h1>
      <Link href="/admin" className="hover:underline">
        Go to Admin Page
      </Link>
    </div>
  );
};

export default Home;
