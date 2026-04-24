import {useCallback, useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router";
import {TbMessageChatbot} from "react-icons/tb";
import {useSelector} from "react-redux";

import {ChevronDownIcon} from "../icons";
import {useSidebar} from "../context/SidebarContext";

const navItems = [
    {
        name: "Scots AI",
        icon: <TbMessageChatbot className="text-[22px]"/>,
        path: "/chat-scots",
    },
];

const othersItems = [];

const AppSidebar = () => {
    const {
        isExpanded,
        isMobileOpen,
        toggleSidebar,
        toggleMobileSidebar,
    } = useSidebar();
    const location = useLocation();
    const user = useSelector((state) => state.user?.user);
    const isCollapsed = !isExpanded && !isMobileOpen;

    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [subMenuHeight, setSubMenuHeight] = useState({});
    const subMenuRefs = useRef({});

    const isActive = useCallback(
        (path) => location.pathname === path,
        [location.pathname]
    );

    useEffect(() => {
        let submenuMatched = false;

        ["main", "others"].forEach((menuType) => {
            const items = menuType === "main" ? navItems : othersItems;

            items.forEach((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubmenu({
                                type: menuType,
                                index,
                            });
                            submenuMatched = true;
                        }
                    });
                }
            });
        });

        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [location, isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            const el = subMenuRefs.current[key];

            if (el) {
                setSubMenuHeight((prev) => ({
                    ...prev,
                    [key]: el.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index, menuType) => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (
                prevOpenSubmenu &&
                prevOpenSubmenu.type === menuType &&
                prevOpenSubmenu.index === index
            ) {
                return null;
            }
            return {type: menuType, index};
        });
    };

    const handleSidebarToggle = () => {
        if (window.innerWidth >= 1024) {
            toggleSidebar();
        } else {
            toggleMobileSidebar();
        }
    };

    const collapsedItemClass = "mx-auto flex h-11 w-11 items-center justify-center rounded-2xl px-0";

    const renderMenuItems = (items, menuType) => (
        <ul className={`flex overflow-visible ${isCollapsed ? "flex-col items-center gap-3" : "flex-col gap-4"}`}>
            {items.map((nav, index) => (
                <li key={nav.name} className={`relative overflow-visible ${isCollapsed ? "w-full flex justify-center" : ""}`}>
                    {nav.subItems ? (
                        <button
                            onClick={() => {
                                if (!isCollapsed) {
                                    handleSubmenuToggle(index, menuType);
                                }
                            }}
                            title={isCollapsed ? nav.name : undefined}
                            className={`menu-item group relative overflow-hidden ${
                                openSubmenu?.type === menuType && openSubmenu?.index === index
                                    ? "menu-item-active"
                                    : "menu-item-inactive"
                            } cursor-pointer ${
                                isCollapsed
                                    ? collapsedItemClass
                                    : "lg:justify-start"
                            }`}
                        >
                            <span
                                className={`menu-item-icon-size ${
                                    openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? "menu-item-icon-active"
                                        : "menu-item-icon-inactive"
                                } ${isCollapsed ? "!mr-0" : ""}`}
                            >
                                {nav.icon}
                            </span>

                            {(isExpanded || isMobileOpen) && (
                                <span className="menu-item-text">{nav.name}</span>
                            )}

                            {(isExpanded || isMobileOpen) && (
                                <ChevronDownIcon
                                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                                        openSubmenu?.type === menuType &&
                                        openSubmenu?.index === index
                                            ? "rotate-180 text-brand-500"
                                            : ""
                                    }`}
                                />
                            )}
                        </button>
                    ) : (
                        nav.path && (
                            <Link
                                to={nav.path}
                                title={isCollapsed ? nav.name : undefined}
                                className={`menu-item group relative overflow-hidden ${
                                    isActive(nav.path)
                                        ? "menu-item-active"
                                        : "menu-item-inactive"
                                } ${isCollapsed ? collapsedItemClass : "lg:justify-start"}`}
                            >
                                <span
                                    className={`menu-item-icon-size ${
                                        isActive(nav.path)
                                            ? "menu-item-icon-active"
                                            : "menu-item-icon-inactive"
                                    } ${isCollapsed ? "!mr-0" : ""}`}
                                >
                                    {nav.icon}
                                </span>

                                {(isExpanded || isMobileOpen) && (
                                    <span className="menu-item-text">{nav.name}</span>
                                )}
                            </Link>
                        )
                    )}

                    {nav.subItems && (isExpanded || isMobileOpen) && (
                        <div
                            ref={(el) => {
                                subMenuRefs.current[`${menuType}-${index}`] = el;
                            }}
                            className="overflow-hidden transition-all duration-300"
                            style={{
                                height:
                                    openSubmenu?.type === menuType &&
                                    openSubmenu?.index === index
                                        ? `${subMenuHeight[`${menuType}-${index}`]}px`
                                        : "0px",
                            }}
                        >
                            <ul className="mt-2 ml-9 space-y-1">
                                {nav.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link
                                            to={subItem.path}
                                            className={`menu-dropdown-item ${
                                                isActive(subItem.path)
                                                    ? "menu-dropdown-item-active"
                                                    : "menu-dropdown-item-inactive"
                                            }`}
                                        >
                                            {subItem.name}

                                            <span className="ml-auto flex items-center gap-1">
                                                {subItem.new && (
                                                    <span
                                                        className={`menu-dropdown-badge ${
                                                            isActive(subItem.path)
                                                                ? "menu-dropdown-badge-active"
                                                                : "menu-dropdown-badge-inactive"
                                                        }`}
                                                    >
                                                        new
                                                    </span>
                                                )}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <aside
            className={`fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-2 text-gray-900 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 lg:mt-0 ${
                isExpanded || isMobileOpen ? "w-[290px] px-5" : "w-[60px] px-2"
            } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
            <div
                className={`flex py-3 ${
                    !isExpanded ? "justify-center" : "justify-start"
                }`}
            >
                <Link to="/">
                    {isExpanded || isMobileOpen ? (
                        <>
                            <img
                                className="dark:hidden"
                                src="/images/logo/logo.png"
                                alt="Logo"
                                width={150}
                                height={40}
                            />
                            <img
                                className="hidden dark:block"
                                src="/images/logo/logo-dark.png"
                                alt="Logo"
                                width={150}
                                height={40}
                            />
                        </>
                    ) : (
                        <img
                            src="/images/logo/logo-icon.png"
                            alt="Logo"
                            width={28}
                            height={28}
                        />
                    )}
                </Link>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto overflow-x-visible no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-3">
                        <div>
                            <div className={`mb-3 flex ${isCollapsed ? "justify-center" : "justify-end"}`}>
                                <button
                                    type="button"
                                    onClick={handleSidebarToggle}
                                    aria-label={isExpanded || isMobileOpen ? "Thu gọn menu" : "Mở rộng menu"}
                                    className={`flex items-center justify-center rounded-2xl border border-gray-200 text-gray-500 transition hover:bg-gray-100 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 ${
                                        isCollapsed ? "h-10 w-10" : "h-9 w-9"
                                    }`}
                                >
                                    {isExpanded ? (
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="3.5"
                                                y="5"
                                                width="17"
                                                height="14"
                                                rx="3"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            />
                                            <path
                                                d="M9 5V19"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="3.5"
                                                y="5"
                                                width="17"
                                                height="14"
                                                rx="3"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            />
                                            <path
                                                d="M15 5V19"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {renderMenuItems(navItems, "main")}
                        </div>
                    </div>
                </nav>

                <div className={`mt-auto border-t border-gray-200 pt-3 dark:border-gray-800 ${isCollapsed ? "pb-3" : "pb-4"}`}>
                    <button
                        type="button"
                        title={isCollapsed ? user?.name || "Tài khoản" : undefined}
                        className={`w-full rounded-2xl border border-gray-200 bg-white text-left transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800 ${
                            isCollapsed
                                ? "mx-auto flex h-11 w-11 items-center justify-center p-0"
                                : "flex items-center gap-3 px-3 py-3"
                        }`}
                    >
                        <span className={`overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 ${isCollapsed ? "h-9 w-9" : "h-10 w-10"}`}>
                            <img
                                src="/images/user/owner.jpg"
                                alt="User"
                                className="h-full w-full object-cover"
                            />
                        </span>

                        {!isCollapsed && (
                            <>
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-sm font-semibold text-gray-800 dark:text-white/90">
                                        {user?.name || "Guest"}
                                    </span>
                                    <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
                                        {user?.email || "Tài khoản người dùng"}
                                    </span>
                                </span>

                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="shrink-0 text-gray-400"
                                >
                                    <path
                                        d="M9 6L15 12L9 18"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AppSidebar;
