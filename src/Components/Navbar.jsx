import { Link, NavLink } from "react-router";
import logo from "../assets/img/firebase-logo.png";
import MyContainer from "./MyContainer";
import MyLink from "./MyLink";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { ClockLoader } from "react-spinners";

const Navbar = () => {
  const { user, setUser, logOut, loading } =
    useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        setUser(null);
        Swal.fire({
          title: "Sign Out Successful!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <div className="py-3 bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b border-gray-700">
      <MyContainer>
        <div className="flex items-center justify-between text-white relative">
          {/* Left - Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} className="w-[50px]" alt="Logo" />
            <span className="font-bold text-lg hidden sm:block">
              Firebase App
            </span>
          </div>

          {/* Center - Nav Links */}
          <ul className="hidden md:flex items-center gap-6 text-white/80 font-medium">
            <li>
              <MyLink to="/">Home</MyLink>
            </li>
            <li>
              <MyLink to="/about-us">About Us</MyLink>
            </li>

            {user &&
            <li>
              <MyLink to="/profile">Profile</MyLink>
            </li>
            }
          </ul>

          {/* Right - User / Sign In */}
          {loading ? (
            <ClockLoader color="#36abab" />
          ) : user ? (
            <div className="relative flex items-center justify-center">
              <button
                onClick={() => setOpen(!open)}
                className="focus:outline-none"
              >
                <img
                  src={user?.photoURL || "https://via.placeholder.com/88"}
                  className="h-[42px] w-[42px] rounded-full border-2 border-white shadow-md"
                  alt="User"
                />
              </button>

              {/* Dropdown */}
              {open && (
                <div
                  className="absolute top-[55px] left-1/2 transform -translate-x-1/2
                  w-80 bg-gray-900/95 text-white rounded-xl shadow-lg p-4 border border-gray-700 text-center z-50"
                >
                  <h2 className="text-lg font-semibold">{user?.displayName}</h2>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                  <hr className="my-2 border-gray-700" />
                  {/* <button
                    onClick={handleSignOut}
                    className="bg-red-500 hover:bg-red-600 transition-all px-4 py-2 rounded-md font-medium w-full"
                  >
                    Sign Out
                  </button> */}
                  <button onClick={handleSignOut} className="my-btn">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signin"
              className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-md font-semibold transition-all"
            >
              Sign In
            </Link>
          )}
        </div>
      </MyContainer>
    </div>
  );
};

export default Navbar;

// import { Link, NavLink } from "react-router";
// import logo from "../assets/img/firebase-logo.png";
// import MyContainer from "./MyContainer";
// import MyLink from "./MyLink";
// import { use } from "react";
// import { AuthContext } from "../Context/AuthContext";
// import Swal from "sweetalert2";
// // import { useContext } from "react";

// const Navbar = () => {
//   // const  result  = useContext(AuthContext);
//   const { user, setUser, logOut } = use(AuthContext);
//   console.log(user);

//   const handleSignOut = () => {
//     // signOut(auth)
//     logOut()
//       .then((result) => {
//         console.log(result);
//         setUser(null);
//         Swal.fire({
//           title: "Sign Out Successful!",
//           icon: "success",
//           draggable: true,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: error.message,
//           //   footer: '<a href="#">Why do I have this issue?</a>',
//         });
//       });
//   };

//   return (
//     <div className="py-2  bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b border-gray-700">
//       {/* bg-slate-100f border-b border-b-slate-300 */}
//       <MyContainer className="flex items-center justify-between">
//         <figure>
//           <img src={logo} className="w-[55px]" />
//         </figure>
//         <ul className="flex items-center gap-5">
//           <li>
//             <MyLink to={"/"}>Home</MyLink>
//           </li>
//           <li>
//             <MyLink to={"/about-us"}>About US</MyLink>
//           </li>
//           <li>
//             <MyLink to={"/profile"}>Profile</MyLink>
//           </li>
//         </ul>
//         {user ? (
//           <div className="text-center space-y-5">
//             {/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
//             {/* For TSX uncomment the commented types below */}
//             <button
//               className=""
//               popoverTarget="popover-1"
//               style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}
//             >
//               <img
//                 src={user?.photoURL || "https://via.placeholder.com/88"}
//                 className="h-[40px] w-[40px] rounded-full mx-auto"
//                 alt=""
//               />
//             </button>

//             <div
//               className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
//               popover="auto"
//               id="popover-1"
//               style={
//                 { positionAnchor: "--anchor-1" } /* as React.CSSProperties */
//               }
//             >
//               <h2 className="text-xl font-semibold">{user?.displayName}</h2>
//               <p className="text-white/80">{user?.email}</p>
//               <button onClick={handleSignOut} className="my-btn">
//                 Sign Out
//               </button>
//             </div>
//           </div>
//         ) : (
//           <button className="bg-purple-500 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
//             <Link to={"/signin"}>Sign in</Link>
//           </button>
//         )}
//       </MyContainer>
//     </div>
//   );
// };

// export default Navbar;
