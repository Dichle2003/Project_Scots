import React, {useMemo, useState} from "react";
import {
    RiAddLine,
    RiMicLine,
    RiSendPlaneFill,
} from "react-icons/ri";
import {useAddChat} from "@/hooks/chats/useChats.js";
import { useNavigate } from "react-router-dom";

const raw = localStorage.getItem("user");
const user = raw ? JSON.parse(raw) : null;
const name = user?.name ?? "bạn";

const ChatScots = () => {
    const navigate = useNavigate();
    const [theme] = useState("light");
    const [input, setInput] = useState("");
    const addMutation = useAddChat();

    const palette = useMemo(() => {
        if (theme === "light") {
            return {
                input: "bg-white text-[#2b2622] placeholder:text-[#938675] border-[#e1d7ca]",
                soft: "bg-[#f5efe7] border-[#e7dccf]",
            };
        }

        return {
            input: "bg-[#221f1c] text-[#f4e8d4] placeholder:text-[#9d978f] border-white/10",
            soft: "bg-white/[0.03] border-white/10",
        };
    }, [theme]);

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed || addMutation.isPending) return;

        try {
            const res = await addMutation.mutateAsync({
                id: null,
                message: trimmed,
            });

            setInput("");
            navigate(`/c/${res.conversationId}`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="-m-5 h-[calc(90vh+2rem)] overflow-hidden bg-white transition-colors duration-300 md:h-[calc(88vh+3rem)]">
            <div className="flex h-full overflow-hidden">
                <main className="flex h-full flex-1 flex-col overflow-hidden">
                    <div className="flex min-h-0 flex-1 flex-col px-4 pb-6 sm:px-6 lg:px-8">
                        <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col gap-4 overflow-hidden">
                            <div className="my-auto py-4 sm:px-6 sm:py-5">
                                <div>
                                    <h2 className="text-2xl">Xin chào {name}!</h2>
                                    <p>Chúng ta nên bắt đầu từ đâu nhỉ?</p>
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
                                                className={`flex h-10 w-10 items-center justify-center rounded-full border ${palette.soft} transition hover:bg-gray-100`}
                                            >
                                                <RiAddLine className="h-5 w-5" />
                                            </button>
                                            <button
                                                type="button"
                                                className={`flex h-10 w-10 items-center justify-center rounded-full border ${palette.soft} transition hover:bg-gray-100`}
                                            >
                                                <RiMicLine className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {input.trim() ? (
                                            <button
                                                type="button"
                                                onClick={handleSend}
                                                disabled={addMutation.isPending}
                                                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                                                aria-label="Gửi tin nhắn"
                                            >
                                                <RiSendPlaneFill className="h-4 w-4 text-white" />
                                            </button>
                                        ) : (
                                            <div className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                                                Enter to send
                                            </div>
                                        )}
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
