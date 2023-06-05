import { useDisclosure } from "@mantine/hooks";
import { FiLogOut } from "react-icons/fi";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useLogoutMutation } from "../../redux/api/authApi";
import { removeUser } from "../../redux/feature/authSlice";

//material tailwind
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
  InboxArrowDownIcon,
  UserCircleIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";

//material tailwind drawer
import { Drawer, Button, IconButton } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  // const token = Cookies.get("token");
  const { token, user } = useSelector((state) => state.authSlice);
  const auth = token ? true : false;
  const nav = useNavigate();

  const [logOut] = useLogoutMutation();
  const dispatch = useDispatch();

  const logOutHandler = async () => {
    const { data } = await logOut(token);
    dispatch(removeUser());
    if (data?.success) {
      return <Navigate to={"/"} />;
    }
  };

  return (
    <>
      <div className=" flex py-3 bg-gray-300 lg:px-10 px-5 justify-between items-center sticky top-0">
        <h1 className=" text-2xl lg:text-3xl font-semibold select-none cursor-pointer">
          Contactify
        </h1>
        {/* simple button before authentication */}
        <div className={`flex gap-3  lg:gap-5 ${auth ? "hidden" : "flex"}`}>
          <Link to={"/login"}>
            <button className="  outline outline-offset-0 outline-gray-300 py-2  px-3 rounded text-color hover:bg-orange-500 hover:text-white duration-300 lg:hover:text-gray-800">
              Login
            </button>
          </Link>
          <Link to={"/register"}>
            <button className=" bg-orange-500 py-2 shadow-md px-2 rounded lg:hover:bg-orange-400 lg:hover:text-gray-800">
              Register
            </button>
          </Link>
        </div>

        {/* After authentication */}
        <div className={`flex gap-3  lg:gap-5 ${auth ? "flex" : "hidden"}`}>
          <div
            className={`flex items-center gap-5 ${auth ? "block" : "hidden"}`}
          >
            <h3 className=" hidden lg:flex">{user?.name}</h3>
            <Menu>
              <MenuHandler>
                <Avatar
                  variant="circular"
                  alt="candice wu"
                  size="sm"
                  className="cursor-pointer"
                  src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
                />
              </MenuHandler>
              <MenuList>
                <MenuItem
                  className="flex items-center gap-2"
                  onClick={() => nav("/user-detail")}
                >
                  <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
                  <Typography variant="small" className="font-normal">
                    My Profile
                  </Typography>
                </MenuItem>
                <MenuItem
                  className="flex items-center gap-2"
                  onClick={() => logOutHandler()}
                >
                  <FiLogOut strokeWidth={2} className="h-4 w-4" />
                  <Typography variant="small" className="font-normal">
                    Logout
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
            {/* <div className=" flex lg:hidden">
            <button>
             
            </button>
          </div> */}
          </div>
          <Button
            onClick={openDrawer}
            size="sm"
            className=" bg-transparent shadow-sm border px-2 py-[1px] border-gray-500  flex lg:hidden"
          >
            <HiOutlineMenuAlt3 size={"2rem"} color=" black" />
          </Button>
        </div>
        <Drawer open={open} onClose={closeDrawer} className="p-3">
          <div className="mb-6 flex items-center justify-between">
            <Link to={"/"} className=" text-3xl">
              <div className="font-semibold">Contactify</div>
            </Link>
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <XMarkIcon strokeWidth={2} className="h-5 w-5" />
            </IconButton>
          </div>
          <div onClick={closeDrawer} className=" lg:px-0">
            <Sidebar />
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default Navbar;
