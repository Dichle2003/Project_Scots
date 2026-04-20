<?php

namespace App\Http\Controllers\Auths;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class MicrosoftController extends Controller
{
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('microsoft')->redirect();
    }

    public function callback(): RedirectResponse
    {
        // try {
            $msUser = Socialite::driver('microsoft')->user();
        // } catch (Throwable $e) {
        //     throw ValidationException::withMessages([
        //         'login' => 'Không thể đăng nhập bằng Microsoft. Vui lòng thử lại.',
        //     ]);
        // }

        $email = $msUser->getEmail();

        if (empty($email)) {
            throw ValidationException::withMessages([
                'login' => 'Tài khoản Microsoft không trả về địa chỉ email hợp lệ.',
            ]);
        }

        $user = User::query()->where('email', $email)->first();

        if (!$user) {
            $user = User::create([
                'name' => $msUser->getName() ?: 'Microsoft User',
                'email' => $email,
                'password' => bcrypt('123456'),
                'email_verified_at' => now(),
                'personal_email' => $email,
            ]);
        }

        Auth::login($user, true);
        request()->session()->regenerate();

        return redirect('/');
    }
}
