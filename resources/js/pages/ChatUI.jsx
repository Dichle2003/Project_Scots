import React, { useEffect, useMemo, useRef, useState } from "react";
import { RiAddLine, RiMicLine, RiSendPlaneFill, RiSparklingLine } from "react-icons/ri";
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
    const shouldStickToBottomRef = useRef(true);
    const isTypingRef = useRef(false);
    const pendingServerMessagesRef = useRef(null);

    const conversationTitle = useMemo(() => data?.data?.conversation?.title ?? "Cuộc trò chuyện", [data]);

    useEffect(() => {
        const apiMessages = data?.data?.messages ?? [];

        if (isTypingRef.current) {
            pendingServerMessagesRef.current = apiMessages;
            return;
        }

        setMessages(apiMessages);
    }, [data]);

    useEffect(() => {
        const container = chatRef.current;
        if (!container || !shouldStickToBottomRef.current) return;

        container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;

        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
    }, [input]);

    useEffect(() => {
        return () => {
            if (typingTimerRef.current) {
                clearTimeout(typingTimerRef.current);
            }
        };
    }, []);

    const handleScroll = () => {
        const container = chatRef.current;
        if (!container) return;

        const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
        shouldStickToBottomRef.current = distanceFromBottom < 120;
    };

    const animateAssistantMessage = (fullText) => {
        if (typingTimerRef.current) {
            clearTimeout(typingTimerRef.current);
        }

        isTypingRef.current = true;

        const words = String(fullText).split(/(\s+)/);
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
                        ? { ...msg, content: words.slice(0, index).join("") }
                        : msg
                )
            );

            if (index < words.length) {
                const currentToken = words[index] ?? "";
                const delay = /^\s+$/.test(currentToken) ? 0 : 45;
                typingTimerRef.current = setTimeout(typeNext, delay);
                return;
            }

            isTypingRef.current = false;

            if (pendingServerMessagesRef.current) {
                const serverMessages = pendingServerMessagesRef.current;
                pendingServerMessagesRef.current = null;
                setMessages(serverMessages);
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

        shouldStickToBottomRef.current = true;
        setMessages((prev) => [...prev, optimisticUserMessage]);
        setInput("");

        try {
            const res = await addChatMutation.mutateAsync({
                id,
                message: trimmed,
            });

            const reply = res?.reply ?? res?.data?.reply ?? "Chào đại ca 👋";

            pendingServerMessagesRef.current = null;
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
        <div className="flex h-full min-h-0 flex-col bg-white text-gray-900">
            <div className="border-b border-gray-100 px-6 py-4">
                <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <RiSparklingLine className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="truncate text-sm font-semibold text-gray-800">{conversationTitle}</h1>
                        <p className="text-xs text-gray-400">Scots AI</p>
                    </div>
                </div>
            </div>

            <div
                ref={chatRef}
                onScroll={handleScroll}
                className="min-h-0 flex-1 overflow-y-auto hide-scrollbar"
            >
                <div className="mx-auto flex w-full max-w-3xl flex-col px-4 pb-32 pt-8 sm:px-6">
                    {isLoading && messages.length === 0 ? (
                        <div className="py-16 text-center text-sm text-gray-400">Đang tải hội thoại...</div>
                    ) : null}

                    {!isLoading && messages.length === 0 ? (
                        <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                <RiSparklingLine className="h-6 w-6" />
                            </div>
                            <h2 className="text-3xl font-semibold text-gray-800">Hỏi gì cũng được</h2>
                            <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
                                Tôi đã kéo giao diện theo hướng ChatGPT hơn: thoáng, gọn, tập trung vào đoạn hội thoại.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {messages.map((msg, index) => {
                                const isUser = msg.role === "user";

                                return (
                                    <div
                                        key={msg.id ?? index}
                                        className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`flex w-full gap-4 ${isUser ? "max-w-fit" : "max-w-full"}`}>
                                            {!isUser && (
                                                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                                    <RiSparklingLine className="h-4 w-4" />
                                                </div>
                                            )}

                                            <div
                                                className={isUser
                                                    ? "max-w-[min(75ch,100%)] rounded-[26px] bg-[#e9f7ef] px-5 py-3 text-[15px] leading-7 text-gray-900"
                                                    : "max-w-[min(78ch,100%)] px-0 py-0 text-[15px] leading-7 text-gray-900"
                                                }
                                            >
                                                <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div className="sticky bottom-0 shrink-0 bg-gradient-to-t from-white via-white to-white/80 px-4 pb-5 pt-3 backdrop-blur sm:px-6">
                <div className="mx-auto w-full max-w-3xl">
                    <div className="rounded-[28px] border border-gray-200 bg-white px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            placeholder="Nhắn Scots AI..."
                            className="max-h-[200px] min-h-[28px] w-full resize-none overflow-y-auto bg-transparent text-[15px] leading-7 text-gray-900 outline-none placeholder:text-gray-400"
                        />

                        <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50"
                                >
                                    <RiAddLine className="h-4 w-4" />
                                </button>
                                <button
                                    type="button"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50"
                                >
                                    <RiMicLine className="h-4 w-4" />
                                </button>
                            </div>

                            {input.trim() ? (
                                <button
                                    type="button"
                                    onClick={handleSend}
                                    disabled={addChatMutation.isPending}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                                    aria-label="Gửi tin nhắn"
                                >
                                    <RiSendPlaneFill className="h-4 w-4 text-white" />
                                </button>
                            ) : (
                                <div className="text-[11px] font-medium text-gray-400">
                                   
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
