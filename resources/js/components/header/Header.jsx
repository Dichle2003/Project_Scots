import { useState } from "react";
import ThemeToggleButton from "../common/ThemeToggleButton";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";
import { Link } from "react-router-dom";

const Header = ({ onClick, onToggle }) => {
    const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

    const toggleApplicationMenu = () => {
        setApplicationMenuOpen(!isApplicationMenuOpen);
    };

    return (
        <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
            <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
                <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
                    {/* Mobile toggle */}
                    <button
                        className="block w-10 h-10 text-gray-500 lg:hidden dark:text-gray-400"
                        onClick={onToggle}
                    >
                        <svg
                            width="16"
                            height="12"
                            viewBox="0 0 16 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>

                    {/* Desktop toggle */}
                    <button
                        onClick={onClick}
                        className="items-center justify-center hidden w-10 h-10 text-gray-500 border-gray-200 rounded-lg dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
                    >
                        <svg
                            width="16"
                            height="12"
                            viewBox="0 0 16 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>

                    {/* Logo */}
                    <Link to="/" className="lg:hidden">
                        <img
                            className="dark:hidden"
                            src="./images/logo/logo.svg"
                            alt="Logo"
                        />
                        <img
                            className="hidden dark:block"
                            src="./images/logo/logo-dark.svg"
                            alt="Logo"
                        />
                    </Link>

                    {/* App menu toggle */}
                    <button
                        onClick={toggleApplicationMenu}
                        className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951"
                                fill="currentColor"
                            />
                        </svg>
                    </button>

                    {/* Search (desktop only) */}
                    <div className="hidden lg:block">
                        <input
                            type="text"
                            placeholder="Search or type command..."
                            className="h-11 w-full rounded-lg border border-gray-200 bg-transparent px-4 text-sm dark:border-gray-800 dark:bg-gray-900"
                        />
                    </div>
                </div>

                {/* Right section */}
                <div
                    className={`${
                        isApplicationMenuOpen ? "flex" : "hidden"
                    } items-center justify-between w-full gap-4 px-5 py-4 lg:flex lg:justify-end lg:px-0`}
                >
                    <div className="flex items-center gap-2">
                        <ThemeToggleButton />
                        <NotificationDropdown />
                    </div>
                    <UserDropdown />
                </div>
            </div>
        </header>
    );
};

export default Header;
