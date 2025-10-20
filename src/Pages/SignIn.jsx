import React, { useContext, useRef, useState } from "react";
import MyContainer from "../Components/MyContainer";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const SignIn = () => {
  // const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const {
    signInFunction,
    signInEmailFunction,
    signInGithubFunction,
    resetPassword,
    setUser,
    setLoading,
    user,
  } = useContext(AuthContext);

  const emailRef = useRef();
  // const [email, setEmail] = useState(null);

  const location = useLocation();
  const from = location.state  || "/";
  const navigate = useNavigate();
  console.log(location);

   if(user){
    navigate("/")
    return ;
    // <Navigate to={"/"}></Navigate>
  }

  const handleSignIn = (event) => {
    event.preventDefault();
    const email = event.target.email?.value;
    const password = event.target.password?.value;
    console.log("Sign In button Click", email, password);
    console.log("Sign In button Click", { email, password });

    // signInWithEmailAndPassword(auth, email, password)
    signInFunction(email, password)
      .then((result) => {
        setLoading(false);
        // if (result.emailVerified == false)
        if (!result.user.emailVerified) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your email is not verified .",
          });
          return;
        }
        console.log(result);
        setUser(result.user);
        Swal.fire({
          title: "Sign In Successful!",
          icon: "success",
          draggable: true,
        });
        navigate(from)
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          //   footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };
  const handleGoogleSignIn = () => {
    signInEmailFunction()
      .then((result) => {
        setLoading(false);
        console.log(result);
        setUser(result.user);
        navigate(from)
        Swal.fire({
          title: "Google Sign in Successful!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          //   footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };
  const handleGithubSignIn = () => {
    signInGithubFunction()
      .then((result) => {
        setLoading(false);
        console.log(result);
        setUser(result.user);
        navigate(from);
        Swal.fire({
          title: "Github Sign in Successful!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          //   footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };
  const handleForgetPassword = () => {
    // console.log(emailRef.current.value);
    const email = emailRef.current.value;
    // sendPasswordResetEmail(auth, email)
    resetPassword(email)
      .then((result) => {
        setLoading(false);
        console.log(result);
        Swal.fire({
          title: "Check your Email to reset password!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  // console.log(user);
  return (
    <div
      className="min-h-[calc(100vh-20px)] flex items-center justify-center
    bg-gradient-to-r from-black via-cyan-800 to-teal-600
    relative overflow-hidden"
    >
      {/* bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 */}

      {/* Animated glow orbs */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
          {/* Left section */}
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              Welcome Back
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Sign in to continue your journey. Manage your account, explore new
              features, and more.
            </p>
          </div>

          {/* Login card */}
          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            <form onSubmit={handleSignIn} className="space-y-5">
              <h2 className="text-2xl font-semibold mb-2 text-center text-white">
                Sign In
              </h2>

              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  // value={email}
                  // onChange={(event) => setEmail(event.target.value)}
                  placeholder="example@email.com"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="relative">
                <label className="block text-sm mb-1">Password</label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-[8px] top-[36px] cursor-pointer z-50"
                >
                  {show ? <FaEye /> : <IoEyeOff />}
                </span>
              </div>
              <button
                type="button"
                onClick={handleForgetPassword}
                className="hover:underline cursor-pointer"
              >
                Forget Password ?
              </button>
              <button type="submit" className="my-btn">
                Login
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center gap-2 my-2">
                <div className="h-px w-16 bg-white/30"></div>
                <span className="text-sm text-white/70">or</span>
                <div className="h-px w-16 bg-white/30"></div>
              </div>

              {/* Google Signin */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
              {/* Github Signin */}
              <button
                type="button"
                onClick={handleGithubSignIn}
                className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <img
                  className="w-7 h-7"
                  src="https://img.icons8.com/material-sharp/24/github.png"
                  alt="github"
                />
                Continue with Github
              </button>

              <p className="text-center text-sm text-white/80 mt-3">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-pink-300 hover:text-white underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default SignIn;
