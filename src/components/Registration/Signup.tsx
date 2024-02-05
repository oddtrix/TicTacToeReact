import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserSignInDTO } from "../../types/user.typing";
import { RegisterUser } from "../../redux/slices/auth";
import { Loading } from "../../types/global.typing";
import { TailSpin } from "react-loader-spinner";
import hide from "../../../public/img/hide.png";
import show from "../../../public/img/show.png";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userStatus = useAppSelector((state) => state.auth.Status);

  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Enter your first name").min(2).max(12),
    surname: Yup.string().required("Enter your second name").min(2).max(12),
    username: Yup.string().required("Enter your nickname").min(3).max(12),

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
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const submitForm = async (data: IUserSignInDTO) => {
    const result = await dispatch(RegisterUser(data));

    if (result.meta.requestStatus === "rejected") {
      setError("root.serverError", { type: "403" });
    } else {
      return navigate("/login");
    }
  };

  return (
    <div className="text-center">
      <h1 className="mt-10 text-3xl text-blue-500 font-bold">
        TicTacToe Online
      </h1>
      <div className="m-auto mt-8 max-w-sm p-4 shadow-2xl border rounded-lg sm:p-6 md:p-8 bg-white">
        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 ">
            Create a new account
          </h5>
          {errors?.root?.serverError.type === "403" && (
            <p className="text-center text-red-500 text-sm">
              User with this nickname or email is already exist
            </p>
          )}
          <div className="space-y-2">
            <p className="text-left text-red-500 text-sm">
              {errors.name?.message}
            </p>
            <input
              type="text"
              className="text-black rounded w-full p-2.5 border border-gray-400 focus:outline-none"
              placeholder="First Name"
              {...register("name")}
            ></input>

            <p className="text-left text-red-500 text-sm">
              {errors.surname?.message}
            </p>
            <input
              type="text"
              className="text-black rounded w-full p-2.5 border border-gray-400 focus:outline-none"
              placeholder="Last name"
              {...register("surname")}
            ></input>

            <p className="text-left text-red-500 text-sm">
              {errors.username?.message}
            </p>
            <input
              type="text"
              id="username"
              className="text-black rounded w-full p-2.5 border border-gray-400 focus:outline-none"
              placeholder="Nickname"
              {...register("username")}
            />

            <p className="text-left text-red-500 text-sm">
              {errors.email?.message}
            </p>
            <input
              type="email"
              id="email"
              className="text-black rounded w-full p-2.5 border border-gray-400 focus:outline-none"
              placeholder="Email"
              {...register("email")}
            />
          </div>

          <p className="text-left text-red-500 text-sm">
            {errors.password?.message}
          </p>

          <div>
            <div className="relative w-full">
              <div className="absolute inset-y-0 right-0 flex items-center px-2">
                <label className="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer"></label>
              </div>
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
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                />
              </div>
              {userStatus === Loading.Loading ? (
                <div className="flex justify-center mt-28">
                  <TailSpin
                    height="60"
                    width="60"
                    color="#51E5FF"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    visible={true}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <input
            type="submit"
            value="Sign up"
            className="bg-green-500 px-8 text-2xl text-white py-2 rounded text-center hover:bg-green-600 hover:cursor-pointer"
          ></input>
        </form>
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
          to="/login"
          className="bg-blue-500 px-8 text-2xl text-white py-2 rounded text-center hover:bg-blue-600"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Signup;
