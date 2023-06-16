<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserPreferenceController extends Controller
{
    /**
     * Get the user's preferences.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'preferences' => $user->preferences,
        ]);
    }

    /**
     * Update the user's preferences.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        /** @var User $user*/
        $user = Auth::user();

        if ($request->categories) {
            $user->categories = $request->categories;
        } else {
            $user->categories = "[]";
        }

        if ($request->sources) {
            $user->sources = $request->sources;
        } else {
            $user->sources = "[]";
        }

        $user->save();
        // Update user preferences logic here

        return response()->json(['message', 'preferences updated!']);
    }
}
