import React, {useEffect} from "react";
import {SidebarProvider, useSidebar} from "../context/SidebarContext";
import {Outlet, useLocation} from "react-router-dom";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import PageMeta from "@/common/PageMeta";

import {LoadingProvider, useLoading} from "@/context/LoadingContext";
import {registerLoading} from "@/context/LoadingService";
import FullScreenLoading from "@/components/FullScreenLoading";

const LayoutContent = () => {
    const {isExpanded, isHovered, isMobileOpen} = useSidebar();
    const {isLoading, setIsLoading} = useLoading();
    const location = useLocation();
    const isChatPage = location.pathname.startsWith("/c/");

    useEffect(() => {
        registerLoading(setIsLoading);
    }, [setIsLoading]);
    return (
        <>
            <PageMeta/>
            {/* 🔥 GLOBAL LOADING */}
            <FullScreenLoading visible={isLoading}/>

            <div className={`h-screen overflow-hidden xl:flex ${isChatPage ? "bg-gray-50" : ""}`}>
                <div>
                    <AppSidebar/>
                    <Backdrop/>
                </div>

                <div
                    className={`flex h-screen min-h-0 flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? "lg:ml-[290px]" : "lg:ml-[60px]"
                    } ${isMobileOpen ? "ml-0" : ""}`}
                >
                    {/*<AppHeader/>*/}

                    <div className={isChatPage
                        ? "flex min-h-0 flex-1 flex-col overflow-hidden"
                        : "mx-auto w-full max-w-(--breakpoint-lg) p-4 md:p-6"
                    }>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>

    );
};

const AppLayout = () => {
    return (
        <SidebarProvider>
            <LoadingProvider>
                <LayoutContent/>
            </LoadingProvider>
        </SidebarProvider>
    );
};

export default AppLayout;
