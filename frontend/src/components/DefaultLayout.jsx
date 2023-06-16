import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios";

export default function DefaultLayout() {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();

  const buttonRef = useRef();
  const menuRef = useRef();

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

  const toggleMenu = () => {
    const menu = document.querySelector(".custom-dropdown");
    menu.classList.toggle("hidden");
  };

  window.addEventListener("click", (e) => {
    const menu = document.querySelector(".custom-dropdown");
    if (
      buttonRef.current &&
      !buttonRef.current.contains(e.target) &&
      menuRef.current &&
      !menuRef.current.contains(e.target)
    ) {
      menu.classList.add("hidden");
    }
  });
  return (
    <div className="bg-gray-900">
      <nav
        className="bg-white border-gray-200 dark:bg-gray-900"
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
            <div className="relative flex flex-col justify-center">
              <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-red-600 dark:hover:text-red-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
                type="button"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 mr-2 rounded-full"
                  src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
                  alt="user photo"
                />
                <p className="pb-1">{currentUser.name}</p>
                <svg
                  className="w-4 h-4 mx-1.5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div
                ref={menuRef}
                className="custom-dropdown z-10 hidden absolute top-11 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div className="font-medium ">{currentUser.name}</div>
                  <div className="truncate">{currentUser.email}</div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
                >
                  <li>
                    <Link
                      onClick={toggleMenu}
                      to="/user-profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={toggleMenu}
                      to="/user-preference"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Preferences
                    </Link>
                  </li>
                </ul>
                <div className="py-2">
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
                  >
                    <li>
                      <button
                        onClick={logout}
                        className="block text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div style={{ minHeight: "calc(100vh - 119px)" }}>
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
