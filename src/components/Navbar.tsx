// import bell from "../assets/bell.png"
// import globe from "../assets/globe.png"
// import group from "../assets/group.png"
// import clipboard from "../assets/clipboard.png"
// import edit from "../assets/edit.png"
// import home from "../assets/home.png"
// import stackit from "../assets/stackit.png"
// import lens from "../assets/lens.png"
// import Avatar from "react-avatar"
// import { auth } from "../firebase/setup"
// import account from "../assets/account.png"
// import PostPopup from "./PostPopup"
// import { useState } from "react"
// import { signOut } from "firebase/auth"; 

// type searchProp = {
//   setSearch:any
// }

// const handleLogout = async () => {
//   try {
//     await signOut(auth);
//     alert("✅ Logged out successfully");
//     window.location.href = "/login"; // or use navigate("/login")
//   } catch (err) {
//     console.error("Logout error:", err);
//   }
// };


// const Navbar = (props:searchProp) => {

//   const [post,setPost] = useState(false)


//   return (
//     <div className="flex pl-20 pt-3 shadow-md h-14 w-screen justify-evenly">
//       <img src={stackit} className="w-24 h-7"/>
//       <img src={home} className="w-7 h-7 ml-10 cursor-pointer"/>
//       <img src={clipboard} className="w-7 h-7 ml-10 cursor-pointer"/>
//       <img src={edit} className="w-7 h-7 ml-10 cursor-pointer"/>
//       <img src={group} className="w-7 h-7 ml-10 cursor-pointer"/>
//       <img src={bell} className="w-7 h-7 ml-10 cursor-pointer"/>
//       <div className="flex border border-spacing-1 h-9 ml-10 w-72 p-1 cursor-pointer">
//         <img src={lens} className="w-3 h-3 mt-2 ml-3"/>
//         <input onChange={(e)=> props?.setSearch(e.target.value)} placeholder="Search Quora" className="ml-2 outline-none"/>
//       </div>
//       {auth?.currentUser?.emailVerified ? <Avatar round size="25" className="mt-0.5 ml-2 cursor-pointer" name={auth?.currentUser?.email ?? account}/>
//       : <Avatar round size="25" className="mt-0.5 ml-2 cursor-pointer mr-10" src={account}/>}
    
//     </div>
//   )
// }

// export default Navbar


import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/setup";

import bell from "../assets/bell.png";
import globe from "../assets/globe.png";
import group from "../assets/group.png";
import clipboard from "../assets/clipboard.png";
import edit from "../assets/edit.png";
import home from "../assets/home.png";
import stackit from "../assets/stackit.png";
import lens from "../assets/lens.png";
import account from "../assets/account.png";
import Avatar from "react-avatar";
import { ToastContainer, toast } from 'react-toastify';
type searchProp = {
  setSearch: any;
};

const Navbar = (props: searchProp) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // alert("✅ Logged out successfully");
      toast.success("LoggedIn succesfully")
      window.location.href = "/"; // or use navigate("/login") if using react-router
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
  
    
    <div className="flex pl-20 pt-3 shadow-md h-14 w-screen justify-evenly relative z-50">
      <ToastContainer autoClose={3000}/>
      <img src={stackit} className="w-24 h-7" />
      <img src={home} className="w-7 h-7 ml-10 cursor-pointer" />
      <img src={clipboard} className="w-7 h-7 ml-10 cursor-pointer" />
      <img src={edit} className="w-7 h-7 ml-10 cursor-pointer" />
      <img src={group} className="w-7 h-7 ml-10 cursor-pointer" />
      <img src={bell} className="w-7 h-7 ml-10 cursor-pointer" />

      {/* Search Bar */}
      <div className="flex border border-spacing-1 h-9 ml-10 w-72 p-1 cursor-pointer">
        <img src={lens} className="w-3 h-3 mt-2 ml-3" />
        <input
          onChange={(e) => props?.setSearch(e.target.value)}
          placeholder="Search StackIt"
          className="ml-2 outline-none w-full"
        />
      </div>

      {/* Avatar + Dropdown */}
      <div className="relative ml-4">
        <div onClick={() => setShowDropdown(!showDropdown)} className="cursor-pointer">
          {auth?.currentUser?.emailVerified ? (
            <Avatar
              round
              size="30"
              name={auth?.currentUser?.email ?? "User"}
            />
          ) : (
            <Avatar
              round
              size="30"
              src={account}
            />
          )}
        </div>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md z-50">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
