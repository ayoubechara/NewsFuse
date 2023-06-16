import { useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";

export default function Login() {
  const { setCurrentUser, setUserToken } = useStateContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setMessage("");

    axiosClient
      .post("/login", {
        email,
        password,
      })
      .then(({ data }) => {
        console.log(data.user);
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  return (
    <>
      <form className="space-y-6" onSubmit={onSubmit}>
        <h5 className="text-xl font-bold text-gray-900 dark:text-white">
          Sign in to <span className="text-red-600">NewsFuse</span>
        </h5>
        <p className="mb-3 text-gray-500 dark:text-gray-400">
          Welcome back! Please log in to access your account.
        </p>
        <div>
          {message && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400">
              <p>{message}</p>
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="email@example.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Login to your account
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <Link
            to="/signup"
            className="text-red-700 hover:underline dark:text-red-500"
          >
            Create account
          </Link>
        </div>
      </form>
    </>
  );
}
