import { useState, useEffect } from "react";
import axiosClient from "../axios";
import CheckboxesSkeleton from "../views/CheckboxesSkeleton";
import { useNavigate, useLocation } from "react-router-dom";

export default function AfterSignup() {
  const [userSources, setUserSources] = useState([]);
  const [sourcesCheckboxes, setSourcesCheckboxes] = useState([]);

  const sources = ["NewsAPI", "The Guardian", "The New York Times"];

  //to check from where we got redirected
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //to make sure we got redirected from the the signup page
    let prevPath = "";
    if (location.state) {
      prevPath = location.state.prevPath;
    }
    if (prevPath != "/signup") {
      navigate("/error-404");
    }
  }, []);

  const handleSourcesCheckboxChange = (event) => {
    const checkboxValue = event.target.value;
    const isChecked = event.target.checked;
    // Update the selected checkboxes in sources group
    if (isChecked) {
      setSourcesCheckboxes([...sourcesCheckboxes, checkboxValue]);
    } else {
      setSourcesCheckboxes(
        sourcesCheckboxes &&
          sourcesCheckboxes.filter((value) => value !== checkboxValue)
      );
    }
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    const formData = {
      sources: sourcesCheckboxes,
    };

    axiosClient
      .put(`/preferences`, formData)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };

  return (
    <>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-26">
        <form
          onSubmit={onSubmit}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <h5 className="text-xl font-bold text-gray-900 dark:text-white">
            Select Your News Preferences
          </h5>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Choose at least one data source to personalize your news feed.
          </p>
          <ul className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:grid-cols-4">
            {sources.map((source, i) => (
              <li key={i}>
                {userSources && userSources.includes(source) ? (
                  <input
                    type="checkbox"
                    id={"source " + i}
                    value={source}
                    onChange={handleSourcesCheckboxChange}
                    defaultChecked
                    className="hidden peer"
                  />
                ) : (
                  <input
                    type="checkbox"
                    id={"source " + i}
                    value={source}
                    onChange={handleSourcesCheckboxChange}
                    className="hidden peer"
                  />
                )}
                <label
                  htmlFor={"source " + i}
                  className="inline-flex items-center justify-center w-full p-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-red-800 hover:text-gray-600 dark:peer-checked:text-gray-300 dark:peer-checked:bg-red-600 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">{source}</div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
          <div>
            {sourcesCheckboxes.length > 0 ? (
              <button
                type="submit"
                className="inline-flex items-center justify-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Continue to the website{" "}
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled
                className="inline-flex items-center justify-center text-white bg-red-400 dark:bg-red-400 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Select at least one source
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
