import { useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Dropdown, Avatar } from "flowbite-react";
import {
  UserIcon,
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import axiosClient from "../axios";

export default function DefaultLayout() {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();

  useEffect(() => {
    document.body.width = "100%";
    axiosClient.get("/me").then(({ data }) => {
      setCurrentUser(data);
    });
  }, []);

  if (!userToken) {
    return <Navigate to="login"></Navigate>;
  }

  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then((res) => {
      setCurrentUser({});
      setUserToken("");
      window.location.reload();
    });
  };

  return (
    <div className="bg-gray-900">
      <nav
        className="bg-white border-gray-200 dark:bg-gray-900 overflow-hidden"
        style={{
          borderBottom: "0.5px solid #1F2937",
        }}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <svg
              className="h-8 w-8 me-2 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
              />
            </svg>

            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
              NewsFuse
            </span>
          </Link>
          <div className="flex items-center md:order-2">
            <Dropdown
              inline
              label={
                <>
                  <span className="me-3 text-gray-200 text-sm font-semibold">
                    {currentUser.name}
                  </span>

                  <Avatar
                    bordered
                    img="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
                    rounded
                  />
                </>
              }
            >
              <Dropdown.Item>
                <Link
                  to="/user-profile"
                  className="flex flex-inline justify-center items-center"
                >
                  <UserIcon className="h-4 text-white mr-2" /> Edit Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <a
                  href="#"
                  className="flex flex-inline justify-center items-center"
                  onClick={logout}
                >
                  <ArrowLeftOnRectangleIcon className="h-4 text-white mr-2" />{" "}
                  Sign out
                </a>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </nav>
      <div style={{ minHeight: "calc(100vh - 127px)" }}>
        <Outlet />
      </div>

      <footer className="w-full bg-white dark:bg-gray-800 border-t-2 border-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a
              target="_blank"
              href="https://www.linkedin.com/in/ayoub-echara-971a9b16b/"
              className="hover:underline"
            >
              Ayoub ECHARA
            </a>
            .
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/ayoub-echara-971a9b16b/"
                className="hover:underline"
              >
                About
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
