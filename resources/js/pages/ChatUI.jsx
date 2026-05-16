import React, { useEffect, useRef, useState } from "react";
import { RiAddLine, RiMicLine, RiSendPlaneFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useAddChat, useChat } from "@/hooks/chats/useChats.js";

export default function ChatUI() {
    const { id } = useParams();
    const { data, isLoading, refetch } = useChat(id);
    const addChatMutation = useAddChat();

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const chatRef = useRef(null);
    const textareaRef = useRef(null);
    const typingTimerRef = useRef(null);

    useEffect(() => {
        const apiMessages = data?.data?.messages ?? [];
        setMessages(apiMessages);
    }, [data]);

    useEffect(() => {
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;

        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    }, [input]);

    useEffect(() => {
        return () => {
            if (typingTimerRef.current) {
                clearTimeout(typingTimerRef.current);
            }
        };
    }, []);

    const animateAssistantMessage = (fullText) => {
        if (typingTimerRef.current) {
            clearTimeout(typingTimerRef.current);
        }

        const tempId = `temp-assistant-${Date.now()}`;
        setMessages((prev) => [
            ...prev,
            {
                id: tempId,
                role: "assistant",
                content: "",
            },
        ]);

        let index = 0;

        const typeNext = () => {
            index += 1;
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === tempId
                        ? { ...msg, content: fullText.slice(0, index) }
                        : msg
                )
            );

            if (index < fullText.length) {
                typingTimerRef.current = setTimeout(typeNext, 20);
            }
        };

        typeNext();
    };

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed || addChatMutation.isPending) return;

        const optimisticUserMessage = {
            id: `temp-user-${Date.now()}`,
            role: "user",
            content: trimmed,
        };

        setMessages((prev) => [...prev, optimisticUserMessage]);
        setInput("");

        try {
            const res = await addChatMutation.mutateAsync({
                id,
                message: trimmed,
            });

            const reply = res?.reply ?? res?.data?.reply ?? "Chào đại ca 👋";

            setMessages((prev) => prev.filter((msg) => msg.id !== optimisticUserMessage.id));
            animateAssistantMessage(reply);
            refetch();
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                {
                    id: `temp-error-${Date.now()}`,
                    role: "assistant",
                    content: "Xin lỗi, hiện tại tôi chưa trả lời được. Đại ca thử lại giúp tôi nhé.",
                },
            ]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex h-screen max-h-screen flex-col overflow-hidden bg-gray-50">
            <div
                ref={chatRef}
                className="min-h-0 flex-1 overflow-y-auto px-4 py-6 hide-scrollbar"
            >
                <div className="mx-auto flex w-full max-w-4xl flex-col space-y-4">
                    {isLoading && messages.length === 0 ? (
                        <div className="text-sm text-gray-500">Đang tải hội thoại...</div>
                    ) : null}

                    {messages.map((msg, index) => (
                        <div
                            key={msg.id ?? index}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
                                    msg.role === "user"
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-gray-800 shadow-sm"
                                }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="shrink-0 bg-gray-50 px-4 pb-4 pt-2">
                <div className="mx-auto w-full max-w-4xl">
                    <div className="rounded-[28px] border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={2}
                            placeholder="Nhập nội dung và nhấn Enter để gửi..."
                            className="max-h-40 w-full resize-none overflow-y-auto bg-transparent text-sm outline-none"
                        />

                        <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-100 transition"
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

                            {input.trim() ? (
                                <button
                                    type="button"
                                    onClick={handleSend}
                                    disabled={addChatMutation.isPending}
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
    );
}
