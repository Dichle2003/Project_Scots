import React, {useEffect} from "react";
import {SidebarProvider, useSidebar} from "../context/SidebarContext";
import {Outlet} from "react-router-dom";
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

    useEffect(() => {
        registerLoading(setIsLoading);
    }, [setIsLoading]);
    return (
        <>
            <PageMeta/>
            {/* 🔥 GLOBAL LOADING */}
            <FullScreenLoading visible={isLoading}/>

            <div className="min-h-screen xl:flex">
                <div>
                    <AppSidebar/>
                    <Backdrop/>
                </div>

                <div
                    className={`flex-1 transition-all duration-300 ease-in-out ${
                        isExpanded ? "lg:ml-[290px]" : "lg:ml-[90px]"
                    } ${isMobileOpen ? "ml-0" : ""}`}
                >
                    <AppHeader/>

                    <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
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
