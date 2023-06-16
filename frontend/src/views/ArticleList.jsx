import React, { useEffect, useState } from "react";
import ArticleListSkeleton from "../views/ArticleListSkeleton";
import axiosClient from "../axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [userSources, setUserSources] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");

  const [limit, setLimit] = useState(12);

  const fetchFilteredArticles = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/articles", {
        params: {
          keyword,
          category,
          source,
          date,
          limit,
        },
      });
      console.log(response.data);
      setArticles(response.data.allArticles);
      setUserSources(response.data.userSources);
      setUserCategories(response.data.userCategories);
      setCategories(response.data.categories);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      fetchFilteredArticles();
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [keyword, category, source, date, limit]);

  const loadMore = (ev) => {
    setLimit(limit + 21);
    ev.target.innerHTML = "Loading...";
  };

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 border-b-4 border-red-500">
        <div
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-red-600">
                Featured
              </span>{" "}
              News
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Your news feed is customized based on the categories and sources
              you like.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col-reverse">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Search for news articles
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MagnifyingGlassIcon className="h-4 text-white" />
                    </div>
                    <input
                      type="text"
                      name="keyword"
                      id="keyword"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                      placeholder="Search..."
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col-reverse">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Select a category
                  </label>
                  <select
                    id="categories"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  >
                    <option value="" defaultValue>
                      Choose a category
                    </option>
                    {categories &&
                      categories.map((category, i) =>
                        userCategories.includes(category.name) ? (
                          <option key={i++} value={category.name}>
                            {category.name}
                          </option>
                        ) : null
                      )}
                  </select>
                </div>
              </div>

              <div className="flex flex-col-reverse">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Select a source
                  </label>
                  <select
                    id="sources"
                    value={source}
                    onChange={(e) => {
                      setSource(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  >
                    <option value="" defaultValue>
                      Choose a source
                    </option>
                    {userSources &&
                      userSources.map((source, i) => (
                        <option key={i++} value={source}>
                          {source}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col-reverse">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Filter by date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  />
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          {loading && (
            <div>
              <ArticleListSkeleton />
            </div>
          )}
          {!loading && (
            <>
              {articles && articles.length > 0 ? (
                <>
                  <div className="grid gap-8 lg:grid-cols-3">
                    {articles.map((article, i) => (
                      <article
                        key={i}
                        className="max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                      >
                        <div className="h-full flex flex-col">
                          <a target="_blank" href={article.url}>
                            <img
                              className="rounded-t-lg flex-1"
                              style={{
                                height: "240px",
                                width: "100%",
                                objectFit: "cover",
                                borderBottom: "5px solid #C81E1E",
                              }}
                              src={
                                article.image_url
                                  ? article.image_url
                                  : "https://img.freepik.com/free-photo/digital-world-map-hologram-red-background_1379-901.jpg?w=1380&t=st=1686790387~exp=1686790987~hmac=944bb5c2348714bc1aba9d8c7949cd6b9bc197aa9fb668c5008d384c20ef8aad"
                              }
                              alt=""
                            />
                          </a>
                          <div className="p-4 flex-1">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                              <a target="_blank" href={article.url}>
                                {article.title}
                              </a>
                            </h2>
                            <p className="mt-2 font-light text-gray-500 dark:text-gray-400">
                              {article.description}
                            </p>
                          </div>
                          <div className="py-2 px-2 flex-1 flex items-end justify-between">
                            <span className="m-3 text-sm font-medium dark:text-white">
                              {article.author
                                ? article.author +
                                  " (" +
                                  article.source_name +
                                  ")"
                                : article.source_name}
                            </span>
                            <span className="m-3 text-sm inline-flex items-center font-medium text-red-600 dark:text-gray-500 hover:underline">
                              {new Date(
                                article.publishing_date
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}{" "}
                  </div>
                  <div className="mt-12 col-span-3 flex justify-center items-center">
                    <button
                      onClick={loadMore}
                      type="button"
                      className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Load More
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="col-span-3 mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    No articles found.
                  </h1>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
