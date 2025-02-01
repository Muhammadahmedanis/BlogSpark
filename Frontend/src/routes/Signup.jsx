import React from "react";

const Signup = () => {
  return (
      <div className="container h-full p-10">
        <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container*/}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* Logo */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        Join Our Community
                      </h4>
                    </div>

                    <form>
                      <p className="mb-4">Create your account to get started</p>
                      {/* Username input */}
                      <div className="relative mb-4">
                        <input
                          type="text"
                          className="peer block w-full rounded bg-transparent px-3 py-2 leading-6 outline-none transition-all duration-200 ease-linear focus:text-primary dark:text-white dark:placeholder:text-neutral-300"
                          id="username"
                          placeholder="Username"
                        />
                      </div>

                      {/* Password input */}
                      <div className="relative mb-4">
                        <input
                          type="password"
                          className="peer block w-full rounded bg-transparent px-3 py-2 leading-6 outline-none transition-all duration-200 ease-linear focus:text-primary dark:text-white dark:placeholder:text-neutral-300"
                          id="password"
                          placeholder="Password"
                        />
                      </div>

                      {/* Submit button */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out"
                          type="button"
                          style={{ background: "linear-gradient(to right, #4b399e, #7f75dd, #6b57d0, #5a45bc)" }}
                        >
                          Sign up
                        </button>
                        <a href="#">Terms and conditions</a>
                      </div>

                      {/* Register button */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0">Already have an account?</p>
                        <button
                          type="button"
                          className="inline-block rounded border-2 border-purple-700 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-purple-700 transition duration-150 ease-in-out hover:bg-purple-700 hover:text-white"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right column container with background and description */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                  style={{ background: "linear-gradient(to right, #4b399e, #7f75dd, #6b57d0, #5a45bc)" }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">Welcome to Our Platform</h4>
                    <p className="text-sm">
                      Join us today and explore a world of opportunities. Our platform provides seamless
                      access to exclusive features that help you stay ahead in your journey. Sign up now
                      and be part of an amazing community!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Signup;
