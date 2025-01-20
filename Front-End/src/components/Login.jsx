import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const [input, setinput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const changehandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const submithandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const res = await axios.post("http://localhost:5000/auth/login", input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res.data);

      if (res.data.success) {
        setIsAuthenticated(true);
        toast.success('User Logged In successfully!');
        localStorage.setItem("devuser", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token); // Store the token
        navigate("/");
      }
      // localStorage.setItem("devuser", JSON.stringify(res.data.user));
    } catch (error) {
      localStorage.removeItem("devuser");
      console.log(error);
      toast.error('Failed to Login User');
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
    <div className="h-[90vh] items-center flex justify-center mb-4 lg:px-0">
      <div className="flex justify-center flex-1 max-w-screen-xl bg-white border shadow sm:rounded-lg">
        {/* <!-- Left: Image --> */}
        <div className="items-center justify-center hidden w-full lg:w-1/2 lg:flex">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="object-cover w-4/5 h-auto"
            alt="Phone image"
          />
        </div>
        {/* <!-- Right: Login Form --> */}
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <section className="w-full p-8">
            <div className="bg-white rounded-lg shadow dark:border sm:max-w-md lg:w-full xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="ml-20 text-xl font-bold leading-tight tracking-tight text-gray-800 text-red md:text-2xl">
                  Sign in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={submithandler}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                    >
                      Your email
                    </label>
                    <input
                      onChange={changehandler}
                      value={input.email}
                      type="email"
                      name="email"
                      id="email"
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      placeholder="email"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium dark:text-gray"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        onChange={changehandler}
                        value={input.password}
                        name="password"
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute text-gray-500 right-3 top-3 hover:text-gray-700"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  {/* <Link to={"/"}> */}
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full py-3 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-gray-700 rounded-lg hover:bg-gray-500 focus:shadow-outline focus:outline-none"
                  >
                    Login
                  </button>
                  {/* </Link> */}
                  <p className="text-sm font-light text-center text-gray dark:text-gray">
                    Don’t have an account yet?{" "}
                    <Link
                      to="/signup"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
