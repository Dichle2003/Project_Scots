<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

class ChatController extends Controller
{
    public static function routes()
    {
        Route::resources([
            'chats' => ChatController::class
        ]);
    }

    public function index()
    {
        $conversations = Conversation::query()
            ->where('user_id', Auth::id())
            ->orderByDesc('updated_at')
            ->get(['id', 'title', 'created_at', 'updated_at']);

        return response()->json([
            'success' => true,
            'data' => $conversations,
        ]);
    }

    public function show($id)
    {
        $conversation = Conversation::query()
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $messages = Message::where('conversation_id', $conversation->id)
            ->orderBy('created_at')
            ->get(['id', 'role', 'content', 'created_at']);

        return response()->json([
            'success' => true,
            'data' => [
                'conversation' => [
                    'id' => $conversation->id,
                    'title' => $conversation->title,
                    'created_at' => $conversation->created_at,
                    'updated_at' => $conversation->updated_at,
                ],
                'messages' => $messages,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $userId = Auth::id();
        $conversationId = $request->input('id');
        $message = trim((string) $request->input('message'));

        if ($message === '') {
            return response()->json([
                'success' => false,
                'message' => 'Message is required',
            ], 422);
        }

        if (!$conversationId) {
            $conversation = Conversation::create([
                'user_id' => $userId,
                'title' => $this->makeConversationTitle($message),
            ]);

            $conversationId = $conversation->id;
        } else {
            $conversation = Conversation::query()
                ->where('id', $conversationId)
                ->where('user_id', $userId)
                ->firstOrFail();
        }

        Message::create([
            'conversation_id' => $conversationId,
            'role' => 'user',
            'content' => $message,
        ]);

        $messages = Message::where('conversation_id', $conversationId)
            ->latest()
            ->take(10)
            ->get()
            ->reverse()
            ->values();

        $payload = [];

        foreach ($messages as $msg) {
            $payload[] = [
                'role' => $msg->role,
                'content' => $msg->content,
            ];
        }

        $response = Http::post('https://ai.hanhdv.info/webhook-test/54177038-b9cf-413e-8602-b16a9872b9bc', [
            'sessionId' => $conversationId,
            'messages' => $payload,
        ]);

        if ($response->failed()) {
            return response()->json([
                'success' => false,
                'message' => 'Không gọi được AI service',
                'error' => $response->body(),
            ], 502);
        }

        $reply = data_get($response->json(), 'reply');

        if (!is_string($reply) || trim($reply) === '') {
            return response()->json([
                'success' => false,
                'message' => 'AI service không trả về reply hợp lệ',
                'error' => $response->body(),
            ], 502);
        }

        $reply = trim($reply);

        Message::create([
            'conversation_id' => $conversationId,
            'role' => 'assistant',
            'content' => $reply,
        ]);

        $conversation->touch();

        return response()->json([
            'success' => true,
            'message' => 'Success',
            'conversationId' => $conversationId,
            'conversation' => [
                'id' => $conversation->id,
                'title' => $conversation->title,
                'created_at' => $conversation->created_at,
                'updated_at' => $conversation->fresh()->updated_at,
            ],
            'reply' => $reply,
        ]);
    }

    public function update(Request $request, $id)
    {
        $conversation = Conversation::query()
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $title = preg_replace('/\s+/u', ' ', trim((string) $request->input('title')));

        if ($title === '') {
            return response()->json([
                'success' => false,
                'message' => 'Title is required',
            ], 422);
        }

        $conversation->update([
            'title' => mb_substr($title, 0, 120),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Updated successfully',
            'data' => $conversation->fresh()->only(['id', 'title', 'created_at', 'updated_at']),
        ]);
    }

    public function destroy($id)
    {
        $conversation = Conversation::query()
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $conversation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Deleted successfully',
        ]);
    }

    private function makeConversationTitle(string $message): string
    {
        $title = preg_replace('/\s+/u', ' ', trim($message));
        $title = mb_substr($title, 0, 60);

        return $title !== '' ? $title : 'Cuộc trò chuyện mới';
    }

    private function renderMockReply($message)
    {
        $message = trim((string) $message);

        if ($message === '') {
            return 'Chào đại ca 👋';
        }

        return 'Chào đại ca 👋 Tôi đã nhận được tin nhắn: ' . $message;
    }
}
