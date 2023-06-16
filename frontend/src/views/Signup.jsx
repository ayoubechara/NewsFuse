import { useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../context/ContextProvider";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Signup() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    axiosClient
      .post("/signup", {
        name: fullName,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        navigate("/after-signup", { state: { prevPath: location.pathname } });
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <>
      <form className="space-y-6" onSubmit={onSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Create an Account
        </h5>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome! Please fill in the following details to create your account.
        </p>
        <div>
          {errors && (
            <div
              className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-500 dark:border-red-600"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="John Doe"
            value={fullName}
            onChange={(ev) => setFullName(ev.target.value)}
            required
          />
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
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password confirmation
          </label>
          <input
            type="password"
            name="password_confirmation"
            id="passwordConfirmation"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={passwordConfirmation}
            onChange={(ev) => setPasswordConfirmation(ev.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Create your account
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-700 hover:underline dark:text-red-500"
          >
            Sign in
          </Link>
        </div>
      </form>
    </>
  );
}
