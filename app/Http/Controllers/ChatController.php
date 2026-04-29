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
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = Auth::id();
        $conversationId = request('id');
        $message = $request->message;
        if(!$conversationId){
            $conversation = Conversation::create([
                'user_id' => $userId,
                'title' => substr($message, 0, 50)
            ]);
            $conversationId = $conversation->id;
        }
        Message::create([
            'conversation_id' => $conversationId,
            'role' => 'user',
            'content' => $message
        ]);
        $messages = Message::where('conversation_id', $conversationId)
            ->latest()
            ->take(20)
            ->get()
            ->reverse()
            ->values();

        $payload = [];

        foreach ($messages as $msg) {
            $payload[] = [
                'role' => $msg->role,
                'content' => $msg->content
            ];
        }
        $response = Http::post('https://ai.hanhdv.info/webhook-test/54177038-b9cf-413e-8602-b16a9872b9bc', [
            'sessionId' => $conversationId,
            'messages' => $payload
        ]);
        dd($response->body());
        $reply = $response['reply'];
        dd($reply);
    }

}
