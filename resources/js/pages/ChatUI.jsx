import React, { useEffect, useRef, useState } from "react";
import {RiAddLine, RiMicLine} from "react-icons/ri";

export default function ChatUI() {
    const [messages, setMessages] = useState([
        { role: "bot", content: "Xin chào 👋" },
        { role: "user", content: "Hello!" },
    ]);
    const [input, setInput] = useState("");

    const chatRef = useRef(null);
    const textareaRef = useRef(null);

    // ✅ Auto scroll xuống cuối
    useEffect(() => {
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    // ✅ Auto resize textarea
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;

        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    }, [input]);

    // ✅ Gửi tin nhắn
    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { role: "user", content: input };

        setMessages((prev) => [...prev, userMsg]);

        setInput("");

        // fake bot typing
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { role: "bot", content: "Đang trả lời..." },
            ]);
        }, 500);
    };

    // ✅ Enter để gửi
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-gray-50">

            {/* 🔹 Chat */}
            <div
                ref={chatRef}
                className="flex-1 overflow-y-auto px-4 py-6 space-y-4 hide-scrollbar"
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            msg.role === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                                msg.role === "user"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>

            {/* 🔹 Input */}
            <div className="border-t  p-3">
                <div className="rounded-[28px] border p-3 sm:p-4 ">
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
                                className="flex h-10 w-10 items-center justify-center rounded-full border  hover:bg-gray-100 transition"
                            >
                                <RiAddLine className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-100 transition"
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
    );
}
