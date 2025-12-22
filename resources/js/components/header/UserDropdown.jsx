import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/modules/storeUser";



export default function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const user = useSelector((state) => state.user?.user);

    // logout
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const handleLogout=()=>{
        dispatch(logout());
        closeDropdown();
        navigate('/login');
        
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-700 dark:text-gray-400"
            >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="/images/user/owner.jpg" alt="User" />
        </span>

                <span className="mr-1 font-medium text-theme-sm">{user?.name || "Guest"}</span>

                <svg
                    className={`transition-transform duration-200 stroke-gray-500 dark:stroke-gray-400 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                >
                    <path
                        d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            <Dropdown
                isOpen={isOpen}
                onClose={closeDropdown}
                className="absolute right-0 mt-4 w-[260px] rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
            >
                <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            Musharof Chowdhury
          </span>
                    <span className="block mt-0.5 text-theme-xs text-gray-500 dark:text-gray-400">
            randomuser@pimjo.com
          </span>
                </div>

                <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                    <li>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            to="/profile"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
                        >
                            Edit profile
                        </DropdownItem>
                    </li>

                    <li>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            to="/settings"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
                        >
                            Account settings
                        </DropdownItem>
                    </li>

                    <li>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            to="/support"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
                        >
                            Support
                        </DropdownItem>
                    </li>
                </ul>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 mt-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
                >
                    Sign out
                </button>
            </Dropdown>
        </div>
    );
}
