import React, { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/solid";

export default function UserProfile() {
  const { currentUser } = useStateContext();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setErrors({ __html: "" });

    axiosClient
      .put(`/users/${user.id}`, user)
      .then(() => {
        window.location.reload();
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
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-26">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">
            Account Settings
          </h4>
          <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <Link
                  to="#"
                  className="inline-flex justify-center items-center p-4 text-red-600 border-b-2 border-red-600 rounded-t-lg active dark:text-red-500 dark:border-red-500 group"
                >
                  <UserIcon className="w-4 h-4 mr-2 text-red-500" />
                  Profile
                </Link>
              </li>
              <li className="mr-2">
                <Link
                  to="/user-preference"
                  className="inline-flex justify-center items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                  aria-current="page"
                >
                  <AdjustmentsVerticalIcon className="w-4 h-4 mr-2 text-gray-400" />
                  Preferences
                </Link>
              </li>
            </ul>
          </div>
          <h5 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
            Personal Informations
          </h5>
          <p className="mb-5 text-gray-500 dark:text-gray-400">
            Manage your account details.
          </p>
          <div>
            {errors && (
              <div
                className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-500 dark:border-gray-800"
                role="alert"
              >
                <span className="sr-only">Info</span>
                <div>
                  {Object.keys(errors).map((key) => (
                    <p key={key}>{errors[key][0]}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
          <form
            className="grid gap-4 sm:grid-cols-2 sm:gap-6"
            onLoad={() => setUser(currentUser)}
            onSubmit={onSubmit}
          >
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                placeholder="Enter your name"
                required
                value={user.name}
                onChange={(ev) => setUser({ ...user, name: ev.target.value })}
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                placeholder="Enter your email"
                required
                value={user.email}
                onChange={(ev) => setUser({ ...user, email: ev.target.value })}
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                placeholder="Enter your password"
                required=""
                onChange={(ev) =>
                  setUser({ ...user, password: ev.target.value })
                }
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password Confirmation
              </label>
              <input
                type="password"
                name="password_confirmation"
                id="passwordConfirmation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                placeholder="Confirm your password"
                required=""
                onChange={(ev) =>
                  setUser({
                    ...user,
                    password_confirmation: ev.target.value,
                  })
                }
              />
            </div>
            <div>
              <button className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="nk-block">
        <div className="row g-gs">
          <div className="card card-bordered">
            <div className="card-aside-wrap">
              <div className="card-inner card-inner-lg">
                <div className="nk-block-head nk-block-head-lg">
                  <div className="nk-block-between">
                    <div className="nk-block-head-content">
                      <div className="nk-block-title text-white">
                        Personal Information
                      </div>
                      <div className="nk-block-des">
                        <p>You can change your name, email or password.</p>
                      </div>
                    </div>
                    <div className="nk-block-head-content align-self-start d-lg-none">
                      <a
                        href="#"
                        className="toggle btn btn-icon btn-trigger mt-n1"
                        data-target="userAside"
                      >
                        <em className="icon ni ni-menu-alt-r"></em>
                      </a>
                    </div>
                  </div>
                </div>
                {errors && (
                  <div className="alert">
                    {Object.keys(errors).map((key) => (
                      <p key={key}>{errors[key][0]}</p>
                    ))}
                  </div>
                )}
                <form onSubmit={onSubmit} className="nk-block">
                  <div
                    onLoad={() => setUser(currentUser)}
                    className="nk-data data-list"
                  >
                    <div className="data-head">
                      <h6 className="overline-title">Basics</h6>
                    </div>
                    <div className="data-item">
                      <div className="data-col">
                        <span className="data-label">Full Name</span>
                        <span className="data-value w-100">
                          <input
                            type="text"
                            className="form-control"
                            value={user.name}
                            onChange={(ev) =>
                              setUser({ ...user, name: ev.target.value })
                            }
                          />
                        </span>
                      </div>
                    </div>
                    <div className="data-item">
                      <div className="data-col">
                        <span className="data-label">Email</span>
                        <span className="data-value w-100">
                          <input
                            type="email"
                            className="form-control mb-2"
                            value={user.email}
                            onChange={(ev) =>
                              setUser({ ...user, email: ev.target.value })
                            }
                          />
                        </span>
                      </div>
                    </div>
                    <div className="data-head">
                      <h6 className="overline-title">Security</h6>
                    </div>
                    <div className="data-item">
                      <div className="data-col">
                        <span className="data-label">Password</span>
                        <span className="data-value w-100">
                          <input
                            className="form-control"
                            type="password"
                            onChange={(ev) =>
                              setUser({ ...user, password: ev.target.value })
                            }
                            placeholder="Password"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="data-item">
                      <div className="data-col">
                        <span className="data-label">
                          Password Confirmation
                        </span>
                        <span className="data-value w-100">
                          <input
                            type="password"
                            onChange={(ev) =>
                              setUser({
                                ...user,
                                password_confirmation: ev.target.value,
                              })
                            }
                            className="form-control"
                            placeholder="Confirm your password"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="data-item text-right">
                      <button className="btn btn-light">Save Settings</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg toggle-screen-lg">
                <div className="card-inner-group">
                  <div className="simplebar-wrapper">
                    <div className="simplebar-height-auto-observer-wrapper">
                      <div className="simplebar-height-auto-observer"></div>
                    </div>
                  </div>
                  <div className="simplebar-mask">
                    <div className="simplebar-offset">
                      <div
                        className="simplebar-content-wrapper"
                        style={{ height: "auto", overflow: "hidden" }}
                      >
                        <div
                          className="simplebar-content"
                          style={{ padding: "0px" }}
                        >
                          <div className="card-inner">
                            <div className="user-card">
                              <div
                                className="user-avatar"
                                style={{ background: "red" }}
                              >
                                <span>AE</span>
                              </div>
                              <div className="user-info">
                                <span className="lead-text">
                                  {currentUser.name}
                                </span>
                                <span className="sub-text">
                                  {currentUser.email}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="card-inner p-0">
                            <ul className="link-list-menu">
                              <li>
                                <Link className="active" to="#">
                                  <em className="icon ni ni-user-fill-c"></em>
                                  <span>Personal Infomation</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/user-preference">
                                  <em className="icon ni ni-grid-add-fill-c"></em>
                                  <span>Preferences</span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="toggle-overlay" data-target="userAside"></div> */}
    </>
  );
}
