import Logout from "@/app/components/logout";

const AdminPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <Logout />
    </div>
  );
};

export default AdminPage;