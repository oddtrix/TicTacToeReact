import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserLoginDTO } from "../../types/user.typing";
import { LoginUser } from "../../redux/slices/auth";
import { Loading } from "../../types/global.typing";
import hide from "../../../public/img/hide.png";
import show from "../../../public/img/show.png";
import React from "react";

const Login = () => {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state) => state.auth.status);
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("Enter your email address")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Enter a valid email address"
      ),
    password: Yup.string()
      .required("Enter the password")
      .min(6, "The password must contain at least 6 characters")
      .matches(
        /^(?=.*[!@#№$;%:?])(?=.*[0-9])(?=.*[A-Z])/,
        "The password must contain at least one special character (!@##$;%:?), one digit and at least one letter in uppercase"
      ),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  const submitForm = async (data: IUserLoginDTO) => {
    const result = await dispatch(LoginUser(data));
    if (result.meta.requestStatus === "rejected") {
      setError("root.serverError", { type: "404" });
    }
    if ("message" in result.payload) {
      window.localStorage.setItem("token", result.payload.message);
    }
  };
  setTimeout(() => {
    const successDiv = document.getElementById("success");
    successDiv?.classList.add("hidden");
  }, 5000);
  return (
    <>
      {userStatus === Loading.Success ? (
        <div
          id="success"
          className="w-[310px] m-auto bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">
                You have successfully created an account
              </p>
              <p className="text-sm">Now log in to it</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <h1 className="mt-10 text-3xl text-blue-500 font-bold text-center">
        TicTacToe Online
      </h1>
      <div className="m-auto mt-8 max-w-sm p-4 shadow-2xl border rounded-lg sm:p-6 md:p-8 bg-white text-center">
        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 ">
            Sign in TicTacToe
          </h5>

          {errors?.root?.serverError.type === "404" && (
            <p className="text-left text-red-500 text-sm">
              Incorrect email address or password
            </p>
          )}

          <div>
            <p className="text-left text-red-500 text-sm">
              {errors.email?.message}
            </p>
            <input
              type="email"
              id="email"
              className="text-black rounded w-full p-2.5 border border-gray-400 focus:outline-none"
              placeholder="name@company.com"
              {...register("email")}
            />
          </div>

          <div>
            <p className="text-left text-red-500 text-sm">
              {errors.password?.message}
            </p>
            <div className="relative w-full">
              <div className="absolute inset-y-0 right-0 flex items-center px-2">
                <label
                  className="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <img src={hide} className="w-6" />
                  ) : (
                    <img src={show} className="w-6" />
                  )}
                </label>
              </div>
              <input
                className="text-black rounded w-full p-2.5 border border-gray-400 focus:outline-none"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
              />
            </div>
          </div>

          <input
            type="submit"
            value="Sign in"
            className="bg-blue-500 px-8 text-2xl text-white py-2 rounded text-center hover:bg-blue-600 hover:cursor-pointer"
          ></input>
        </form>
        {userStatus === Loading.Loaded ? <Navigate to="/menu" /> : ""}

        <div className="relative my-4">
          <span className="relative z-10 px-3 bg-white text-gray-700">or</span>
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full bg-gray-300 h-[1px]"></div>
          </div>
        </div>
        <Link
          to="/signup"
          className="bg-green-500 px-8 text-2xl text-white py-2 rounded text-center hover:bg-green-600"
        >
          Create an account
        </Link>
      </div>
    </>
  );
};

export default Login;
