<?php

namespace App\Http\Middleware;

use Closure;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AuthJwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $token = JWTAuth::parseToken();
            $token->authenticate();

            return $next($request);
        } catch (TokenExpiredException $e) {
            return $this->unauthorized('The session has expired, re-login is required.', 401);
        } catch (TokenInvalidException $e) {
            return $this->unauthorized('Your session is invalid, re-login required.', 401);
        } catch (JWTException $e) {
            return $this->unauthorized('Could not get information about the session, re-login required.', 401);
        }
    }

    private function unauthorized($message = null, $status)
    {
        return response()->json([
            'message' => $message ? $message : 'You are not authorized for this action.',
        ], $status, [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}
