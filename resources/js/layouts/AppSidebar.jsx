import {useCallback, useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router";

// Assume these icons are imported from an icon library
import {
    BoxCubeIcon,
    CalenderIcon,
    ChevronDownIcon,
    GridIcon,
    HorizontaLDots,
    ListIcon,
    PageIcon,
    PieChartIcon,
    PlugInIcon,
    TableIcon,
    UserCircleIcon,
} from "../icons";
import {useSidebar} from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";


const navItems = [
    {
        icon: <UserCircleIcon/>,
        name: "Nhân sự",
        path: "/users",
    },
    {
        icon: <UserCircleIcon/>,
        name: "User Profile",
        path: "/profile",
    },
    {
        icon: <BoxCubeIcon/>,
        name: "Trung Tâm",
        path: "/centers",
    },
    {
        name: "Tables",
        icon: <TableIcon/>,
        subItems: [{name: "Basic Tables", path: "/basic-tables", pro: false}],
    },
    {
        name: "Scots AI",
        icon: <PageIcon/>,
        path: "/chat-scots",
    },
];

const othersItems = [
    {
        icon: <PieChartIcon/>,
        name: "Charts",
        subItems: [
            {name: "Line Chart", path: "/line-chart", pro: false},
            {name: "Bar Chart", path: "/bar-chart", pro: false},
        ],
    },
    {
        icon: <BoxCubeIcon/>,
        name: "UI Elements",
        subItems: [
            {name: "Alerts", path: "/alerts", pro: false},
            {name: "Avatar", path: "/avatars", pro: false},
            {name: "Badge", path: "/badge", pro: false},
            {name: "Buttons", path: "/buttons", pro: false},
            {name: "Images", path: "/images", pro: false},
            {name: "Videos", path: "/videos", pro: false},
        ],
    },
    {
        icon: <PlugInIcon/>,
        name: "Authentication",
        subItems: [
            {name: "Sign In", path: "/signin", pro: false},
            {name: "Sign Up", path: "/signup", pro: false},
        ],
    },
];

const AppSidebar = () => {
    const {isExpanded, isMobileOpen, isHovered, setIsHovered} = useSidebar();
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
                            <h2
                                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                                    !isExpanded
                                        ? "lg:justify-center"
                                        : "justify-start"
                                }`}
                            >
                                {isExpanded || isMobileOpen ? (
                                    "Menu"
                                ) : (
                                    <HorizontaLDots className="size-6"/>
                                )}
                            </h2>
                            {renderMenuItems(navItems, "main")}
                        </div>
                        <div className="">
                            <h2
                                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                                    !isExpanded
                                        ? "lg:justify-center"
                                        : "justify-start"
                                }`}
                            >
                                {isExpanded || isMobileOpen ? (
                                    "Others"
                                ) : (
                                    <HorizontaLDots/>
                                )}
                            </h2>
                            {renderMenuItems(othersItems, "others")}
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;
