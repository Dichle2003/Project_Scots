<?php

namespace App\Http\Controllers\Auths;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class MicrosoftController extends Controller
{
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('microsoft')->redirect();
    }

    private function parseMicrosoftDisplayName(?string $displayName): array
    {
        $displayName = trim((string) $displayName);

        if ($displayName === '') {
            return [
                'name' => 'Microsoft User',
                'job_title' => null,
            ];
        }

        if (preg_match('/^(.*?)\s*\((.*?)\)\s*$/u', $displayName, $matches)) {
            $name = trim($matches[1]);
            $jobTitle = trim($matches[2]);

            return [
                'name' => $name !== '' ? $name : 'Microsoft User',
                'job_title' => $jobTitle !== '' ? $jobTitle : null,
            ];
        }

        return [
            'name' => $displayName,
            'job_title' => null,
        ];
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

        $parsedProfile = $this->parseMicrosoftDisplayName($msUser->getName());

        $user = User::query()->where('email', $email)->first();

        if (!$user) {
            $user = User::create([
                'name' => $parsedProfile['name'],
                'job_title' => $parsedProfile['job_title'],
                'provider' => 'microsoft',
                'microsoft_id' => $msUser->getId(),
                'status' => 'active',
                'email' => $email,
                'email_verified_at' => now(),
                'personal_email' => $email,
            ]);
        }

        Auth::login($user, true);
        request()->session()->regenerate();

        $token = $user->createToken('microsoft-login')->accessToken;
        $frontendRedirectUrl = url('/')
            . '?token=' . urlencode($token)
            . '&user=' . urlencode(json_encode($user));

        return redirect($frontendRedirectUrl);
    }
}
