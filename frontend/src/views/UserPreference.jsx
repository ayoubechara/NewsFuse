import React, { useEffect, useState } from "react";
import axiosClient from "../axios";
import CheckboxesSkeleton from "../views/CheckboxesSkeleton";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/solid";

export default function UserPreference() {
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);

  const [userCategories, setUserCategories] = useState([]);
  const [userSources, setUserSources] = useState([]);

  const [categoriesCheckboxes, setCategoriesCheckboxes] = useState([]);
  const [sourcesCheckboxes, setSourcesCheckboxes] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/get-preferences");
      setSources(response.data.sources);
      setCategories(response.data.categories);
      setUserCategories(response.data.userCategories);
      setUserSources(response.data.userSources);
      setCategoriesCheckboxes(response.data.userCategories);
      setSourcesCheckboxes(response.data.userSources);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch sources:", error);
      setLoading(false);
    }
  };

  const handleCategoriesCheckboxChange = (event) => {
    const checkboxValue = event.target.value;
    const isChecked = event.target.checked;
    // Update the selected checkboxes in categories Group
    if (isChecked) {
      setCategoriesCheckboxes([...categoriesCheckboxes, checkboxValue]);
    } else {
      setCategoriesCheckboxes(
        categoriesCheckboxes &&
          categoriesCheckboxes.filter((value) => value !== checkboxValue)
      );
    }
  };

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

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = {
      categories: categoriesCheckboxes,
      sources: sourcesCheckboxes,
    };

    axiosClient
      .put(`/preferences`, formData)
      .then(() => {
        window.location.reload();
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
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">
            Account Settings
          </h4>
          <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <Link
                  to="/user-profile"
                  className="inline-flex justify-center items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                >
                  <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
                  Profile
                </Link>
              </li>
              <li className="mr-2">
                <Link
                  to="#"
                  className="inline-flex justify-center items-center p-4 text-red-600 border-b-2 border-red-600 rounded-t-lg active dark:text-red-500 dark:border-red-500 group"
                  aria-current="page"
                >
                  <AdjustmentsVerticalIcon className="w-4 h-4 mr-2 text-red-400" />
                  Preferences
                </Link>
              </li>
            </ul>
          </div>
          <h5 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
            Edit Your News Preferences
          </h5>
          <p className="mb-5 text-gray-500 dark:text-gray-400">
            Customize your content preferences with preferred categories and
            sources.
          </p>
          <form onSubmit={onSubmit}>
            <h4 className="mb-4 text-sm font-medium text-gray-300 bg-gray-600 rounded px-2 py-1.5">
              Categories
            </h4>
            {loading && (
              <div>
                <CheckboxesSkeleton />
              </div>
            )}
            <ul className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:grid-cols-6">
              {!loading && (
                <>
                  {categories &&
                    categories.map((category, i) => (
                      <li key={i}>
                        {userCategories &&
                        userCategories.includes(category.name) ? (
                          <input
                            type="checkbox"
                            id={"category " + i}
                            value={category.name}
                            onChange={handleCategoriesCheckboxChange}
                            defaultChecked
                            className="hidden peer"
                          />
                        ) : (
                          <input
                            type="checkbox"
                            id={"category " + i}
                            value={category.name}
                            onChange={handleCategoriesCheckboxChange}
                            className="hidden peer"
                          />
                        )}
                        <label
                          htmlFor={"category " + i}
                          className="inline-flex items-center justify-center w-full p-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-red-800 hover:text-gray-600 dark:peer-checked:text-gray-300 dark:peer-checked:bg-red-600 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          <div className="block">
                            <div className="w-full text-lg font-semibold">
                              {category.name}
                            </div>
                          </div>
                        </label>
                      </li>
                    ))}
                </>
              )}
            </ul>

            <h4 className="mb-4 text-sm font-medium text-gray-300 bg-gray-600 rounded px-2 py-1.5">
              Sources
            </h4>

            {loading && (
              <div>
                <CheckboxesSkeleton />
              </div>
            )}
            <ul className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:grid-cols-4">
              {!loading && (
                <>
                  {sources &&
                    sources.map((source, i) => (
                      <li key={i}>
                        {userSources && userSources.includes(source.id) ? (
                          <input
                            type="checkbox"
                            id={"source " + i}
                            value={source.id}
                            onChange={handleSourcesCheckboxChange}
                            defaultChecked
                            className="hidden peer"
                          />
                        ) : (
                          <input
                            type="checkbox"
                            id={"source " + i}
                            value={source.id}
                            onChange={handleSourcesCheckboxChange}
                            className="hidden peer"
                          />
                        )}
                        <label
                          htmlFor={"source " + i}
                          className="inline-flex items-center justify-center w-full p-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-red-800 hover:text-gray-600 dark:peer-checked:text-gray-300 dark:peer-checked:bg-red-600 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          <div className="block">
                            <div className="w-full text-lg font-semibold">
                              {source.name}
                            </div>
                          </div>
                        </label>
                      </li>
                    ))}
                  {!sources && (
                    <h1 className="col-span-3 mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-xl lg:text-xl dark:text-white">
                      No sources found.{" "}
                      <span className="text-sm font-thin">
                        (Change the API KEY)
                      </span>
                    </h1>
                  )}
                </>
              )}
            </ul>
            <button className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
              Save Settings
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
