import React, { useState } from "react";
import MyContainer from "../Components/MyContainer";
import { Link } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
// import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const SignUp = () => {
  const [show, setShow] = useState();

  const handleSignUp = (event) => {
    event.preventDefault();
    const email = event.target.email?.value;
    const password = event.target.password?.value;
    console.log("Sign Up  Function Entered", email, password);
    console.log("Sign Up  Function Entered", { email, password });

    // if (password.length < 6) {
    //   toast.error("Password Should be at least 6 digit");
    //   return;
    // }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character !",
        //   footer: '<a href="#">Why do I have this issue?</a>',
      });
      //   toast.error(
      //     "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character !"
      //   );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        Swal.fire({
          title: "Sign Up Successful!",
          icon: "success",
          draggable: true,
        });
        // toast.success("Sign Up Successful");
      })
      .catch((error) => {
        console.log("Firebase Error:", error);
        console.log("Error Code:", error.code);

        if (error.code === "auth/email-already-in-use") {
          Swal.fire({
            icon: "error",
            title: "User Already Exists",
            text: "This email is already registered. Please use another one.",
          });
        } else if (error.code === "auth/invalid-email") {
          Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email address.",
          });
        } else if (error.code === "auth/weak-password") {
          Swal.fire({
            icon: "error",
            title: "Weak Password",
            text: "Password should be at least 6 characters long.",
          });
        } else if (error.code === "auth/missing-email") {
          Swal.fire({
            icon: "error",
            title: "Missing Email",
            text: "Please enter your email before signing up.",
          });
        } else if (error.code === "auth/network-request-failed") {
          Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "Please check your internet connection and try again.",
          });
        } else if (error.code === "auth/too-many-requests") {
          Swal.fire({
            icon: "error",
            title: "Too Many Attempts",
            text: "You’ve tried too many times. Please wait a bit and try again.",
          });
        } else if (error.code === "auth/internal-error") {
          Swal.fire({
            icon: "error",
            title: "Internal Error",
            text: "Something went wrong. Please try again later.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Unexpected Error",
            text: error.message || "Something went wrong. Please try again.",
          });
        }
      });
  };

  return (
    <div
      className="min-h-[96vh] flex items-center justify-center  relative 
   bg-gradient-to-l from-black via-cyan-800 to-teal-600
    overflow-hidden"
    >
      {/*  bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 */}
      {/* Animated floating circles */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-pink-400/30 rounded-full blur-2xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-2xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              Create Your Account
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Join our community and unlock exclusive features. Your journey
              begins here!
            </p>
          </div>

          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">
              Sign Up
            </h2>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-[8px] top-[36px] cursor-pointer z-50"
                >
                  {show ? <FaEye /> : <IoEyeOff />}
                </span>
              </div>

              <button type="submit" className="my-btn">
                Sign Up
              </button>

              <div className="text-center mt-3">
                <p className="text-sm text-white/80">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-pink-300 hover:text-white font-medium underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default SignUp;
