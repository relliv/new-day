<?php

namespace App\Http\Controllers\Api\v1\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

use App\Repositories\User\UserRepository;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;

use Carbon\Carbon;

class AuthController extends Controller
{
    /** @var  UserRepository */
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Login with given credentials.
     *
     * @param LoginRequest $request request body
     */
    public function login(LoginRequest $request){
        $accessToken = auth('api')->attempt($request->all(['email', 'password']));

        if (!$accessToken){
            return response()->json([
                'message' => 'Email veya şifre yanlış.'
            ], 401);
        }

        return $this->respondWithToken($accessToken);
    }

    /**
     * Register new user
     *
     * @param RegisterRequest $request request body
     */
    public function register(RegisterRequest $request){
        $email = $request->offsetGet('email');

        $user = $this->userRepository->where([
            ['email', '=', $email]
        ])->first();

        if ($user){
            return response()->json([
                'message' => 'Zaten bu maile sahip bir kullanıcı var.'
            ], 400);
        }

        $firstName = $request->offsetGet('first_name');
        $lastName = $request->offsetGet('last_name');

        $request->offsetSet('name', "{$firstName} {$lastName}");

        $user = $this->userRepository->makeModel()
        ->create($request->all($this->userRepository->makeModel()->fillable));

        if (!$user){
            return response()->json([
                'message' => 'Kullanıcı kaydı başarısız. Tekrar deneyin.'
            ], 401);
        }

        return response()->json([
            'message' => 'Kaydınız oluşturulmuştur.'
        ]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json([
            'message' => 'Oturum sonlandırıldı.'
        ]);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $user = auth('api')->user();

        $expireInSeconds = auth('api')->factory()->getTTL() * 60;
        $now = Carbon::now();
        $expire = $now->addSeconds($expireInSeconds)->format('Y-m-d H:i:s');

        return response()->json([
            'access_token' => $token,
            'expire' => $expire,
            'user' => [
                'name' => $user->name
            ]
        ]);
    }
}
