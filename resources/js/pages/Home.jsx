import React, {useEffect, useMemo, useRef, useState} from "react";
import {
    RiAddLine,
    RiChat3Line,
    RiFolderOpenLine,
    RiMicLine,
    RiSearchLine,
    RiSendPlane2Fill,
    RiSparklingLine,
} from "react-icons/ri";
import {useAddChat} from "@/hooks/chats/useChats.js";

const raw = localStorage.getItem("user");
const user = raw ? JSON.parse(raw) : null;
const name = user?.name ?? "bạn";
const menuItems = [{icon: RiAddLine, label: "New chat", active: true}, {
    icon: RiSearchLine,
    label: "Search"
}, {icon: RiChat3Line, label: "Chats"}, {icon: RiFolderOpenLine, label: "Projects"}, {
    icon: RiSparklingLine,
    label: "Artifacts"
},];

const MicrosoftLogo = () => (
    <span className="grid h-4 w-4 grid-cols-2 grid-rows-2 gap-[2px] overflow-hidden rounded-[2px]">
        <span className="bg-[#f25022]"/>
        <span className="bg-[#7fba00]"/>
        <span className="bg-[#00a4ef]"/>
        <span className="bg-[#ffb900]"/>
    </span>);

const ChatScots = () => {
    const [theme, setTheme] = useState("light");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const messageEndRef = useRef(null);

    const storedUser = localStorage.getItem("user");
    let displayName = "bạn";

    if (storedUser) {
        try {
            const parsedUser = JSON.parse(storedUser);
            displayName = parsedUser?.name || parsedUser?.email || displayName;
        } catch {
            displayName = "bạn";
        }
    }

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    const palette = useMemo(() => {
        if (theme === "light") {
            return {
                // page: "bg-[#f5f1ea] text-[#2a2723]",
                sidebar: "bg-[#ece4d6] border-[#d8ccb8] text-[#2f2a24]",
                sidebarMuted: "text-[#7a6d5a]",
                card: "bg-white border-[#e4d9ca] text-[#2b2622] shadow-[0_20px_70px_rgba(58,44,24,0.08)]",
                soft: "bg-[#f5efe7] border-[#e7dccf]",
                bubbleUser: "bg-[#2d2a26] text-[#f8f2e8]",
                input: "bg-white text-[#2b2622] placeholder:text-[#938675] border-[#e1d7ca]",
                heading: "text-[#2a2723]",
                subHeading: "text-[#7c7060]",
                active: "bg-white text-[#2a2723]",
                inactive: "text-[#51483f] hover:bg-white/70",
                topButton: "bg-white border-[#ddd2c4] text-[#3d362f] hover:bg-[#faf7f2]",
                history: "hover:bg-[#f8f3ec]",
                emptyBox: "border-dashed border-[#dccfbf] bg-[#faf6f0] text-[#7b6f60]",
            };
        }

        return {
            page: "bg-[#1f1d1b] text-[#f3e4ca]",
            sidebar: "bg-[#1b1917] border-white/10 text-[#efe2c8]",
            sidebarMuted: "text-white/35",
            card: "bg-[#2a2825] border-white/8 text-[#f3e4ca] shadow-[0_20px_70px_rgba(0,0,0,0.25)]",
            soft: "bg-white/[0.03] border-white/10",
            bubbleUser: "bg-[#f0d7b3] text-[#231f1b]",
            input: "bg-[#221f1c] text-[#f4e8d4] placeholder:text-[#9d978f] border-white/10",
            heading: "text-[#f0d7b3]",
            subHeading: "text-[#9d978f]",
            active: "bg-white/6 text-[#f6e7c8]",
            inactive: "text-white/80 hover:bg-white/5",
            topButton: "bg-[#171614] border-[#3b3937] text-[#f0d8b1] hover:bg-[#1e1c1a]",
            history: "hover:bg-white/5",
            emptyBox: "border-dashed border-white/10 bg-[#24211f] text-[#9d978f]",
        };
    }, [theme]);
    const addMutation = useAddChat();
    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        const payload = {
            id: null,
            message: trimmed
        }
        addMutation.mutate(payload)
        // setInput("");
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };
    return (
        <div
            className={`-m-5 h-[calc(90vh+2rem)] overflow-hidden transition-colors duration-300 md:-m-5 md:h-[calc(88vh+3rem)] ${palette.page}`}>
            <div className="flex h-full overflow-hidden">
                <main className="flex h-full  flex-1 flex-col overflow-hidden">
                    <div className="flex min-h-0 flex-1 flex-col px-4 pb-6 sm:px-6 lg:px-8">
                        <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col gap-4 overflow-hidden">
                            <div className=" my-auto py-4 sm:px-6 sm:py-5">
                                <div>
                                    <h2 className="text-2xl">Xin chào {name}!</h2>
                                    <p>Chúng ta nên bắt đầu từ đâu nhỉ?</p>
                                </div>
                                <div>

                                </div>
                                <div className={`rounded-[28px] border p-3 sm:p-4 ${palette.input}`}>
                                      <textarea
                                          value={input}
                                          onChange={(event) => setInput(event.target.value)}
                                          onKeyDown={handleKeyDown}
                                          rows={2}
                                          placeholder="Nhập nội dung và nhấn Enter để gửi..."
                                          className="w-full resize-none bg-transparent text-sm outline-none"
                                      />

                                    <div className="mt-3 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                className={`flex h-10 w-10 items-center justify-center rounded-full border ${palette.soft} hover:bg-gray-100 transition`}
                                            >
                                                <RiAddLine className="h-5 w-5" />
                                            </button>
                                            <button
                                                type="button"
                                                className={`flex h-10 w-10 items-center justify-center rounded-full border ${palette.soft} hover:bg-gray-100 transition`}
                                            >
                                                <RiMicLine className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                                            Enter to send
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
};

export default ChatScots;
