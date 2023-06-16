<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
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
        /** @var User $user*/
        $user = Auth::user();

        $user_categories = json_decode($user->categories, true);
        $user_sources = json_decode($user->sources, true);

        $categories = Category::get();

        return response()->json(array(
            'categories' => $categories,
            'userCategories' => $user_categories,
            'userSources' => $user_sources,
        ));
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

        return response()->json(['message', 'preferences updated!']);
    }
}
