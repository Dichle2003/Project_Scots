import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createChat, deleteChat, getChat, getChats, updateChat } from "@/api/chat.api.js";
const module = 'chats';

export const useAddChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createChat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [module] });
        },
    });
};

export const useChats = () => {
    return useQuery({
        queryKey: [module],
        queryFn: getChats,
    });
};

export const useUpdateChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateChat(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [module] });
        },
    });
};

export const useDeleteChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteChat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [module] });
        },
    });
};

export const useChat = (id) => {
    return useQuery({
        queryKey: [module, id],
        queryFn: () => getChat(id),
        enabled: !!id,
    });
};
