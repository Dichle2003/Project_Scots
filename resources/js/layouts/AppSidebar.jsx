import {useCallback, useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router";
import { TbMessageChatbot } from "react-icons/tb";

// Assume these icons are imported from an icon library
import {
    CalenderIcon,
    ChevronDownIcon,
    HorizontaLDots,
    PageIcon,
} from "../icons";
import {useSidebar} from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";


const navItems = [
   
    {
        name: "Scots AI",
        icon: <TbMessageChatbot />,
        path: "/chat-scots",
    },
];

const othersItems = [
   
];

const AppSidebar = () => {
    const {
        isExpanded,
        isMobileOpen,
        isHovered,
        setIsHovered,
        toggleSidebar,
        toggleMobileSidebar,
    } = useSidebar();
    const location = useLocation();
    const isCollapsed = !isExpanded && !isMobileOpen;

    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [subMenuHeight, setSubMenuHeight] = useState({});
    const subMenuRefs = useRef({});

    // const isActive = (path: string) => location.pathname === path;
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

    const renderMenuItems = (items, menuType) => (
        <ul className="flex flex-col gap-4 overflow-visible">
            {items.map((nav, index) => (
                <li key={nav.name} className="relative overflow-visible">
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
                                    ? "lg:w-[220px] lg:justify-start lg:px-3"
                                    : "lg:justify-start"
                            }`}
                        >
                            <span
                                className={`menu-item-icon-size ${
                                    openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? "menu-item-icon-active"
                                        : "menu-item-icon-inactive"
                                }`}
                            >
                              {nav.icon}
                            </span>

                            {(isExpanded || isMobileOpen) && (
                                <span className="menu-item-text">{nav.name}</span>
                            )}

                            {isCollapsed && (
                                <span className="ml-3 max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 group-hover:max-w-[140px] group-hover:opacity-100">
                                    {nav.name}
                                </span>
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
                                } ${isCollapsed ? "lg:w-[220px] lg:justify-start lg:px-3" : "lg:justify-start"}`}
                            >
                                  <span
                                      className={`menu-item-icon-size ${
                                          isActive(nav.path)
                                              ? "menu-item-icon-active"
                                              : "menu-item-icon-inactive"
                                      }`}
                                  >
                                    {nav.icon}
                                  </span>

                                {(isExpanded || isMobileOpen) && (
                                    <span className="menu-item-text">{nav.name}</span>
                                )}

                                {isCollapsed && (
                                    <span className="ml-3 max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 group-hover:max-w-[140px] group-hover:opacity-100">
                                        {nav.name}
                                    </span>
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
                            <ul className="mt-2 space-y-1 ml-9">
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

                                            <span className="flex items-center gap-1 ml-auto">
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
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
        ${
                isExpanded || isMobileOpen
                    ? "w-[290px]"
                    : "w-[90px]"
            }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
        >
            <div
                className={`py-3 flex ${
                    !isExpanded ? "lg:justify-center" : "justify-start"
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
                            width={32}
                            height={32}
                        />
                    )}
                </Link>
            </div>
            <div className="flex flex-col overflow-y-auto overflow-x-visible duration-300 ease-linear no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <div
                                className={`mb-4 flex items-center ${
                                    !isExpanded ? "lg:justify-center" : "justify-end"
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={handleSidebarToggle}
                                    aria-label={isExpanded || isMobileOpen ? "Thu gọn menu" : "Mở rộng menu"}
                                    className={`hidden lg:flex items-center justify-center h-9 w-9 rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 ${
                                        !isExpanded ? "absolute  top-34" : ""
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
                                            <path
                                                d="M15 6L9 12L15 18"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
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
                                            <path
                                                d="M9 6L15 12L9 18"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {renderMenuItems(navItems, "main")}
                        </div>
                        
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;
