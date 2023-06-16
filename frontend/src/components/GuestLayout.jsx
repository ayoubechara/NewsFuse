import { Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  const { currentUser, userToken } = useStateContext();

  if (userToken) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center h-screen dark">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <Outlet />
      </div>
    </div>
  );
}
