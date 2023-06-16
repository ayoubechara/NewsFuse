<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Services\NewsAPI;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    protected $newsAPI;

    public function __construct(NewsAPI $newsAPI)
    {
        $this->newsAPI = $newsAPI;
    }

    public function index(Request $request)
    {
        /** @var User $user*/
        $user = Auth::user();

        // Retrieve user preferences from the request or authenticated user
        $keyword = $request->input('keyword');
        $category = $request->input('category');
        $source = $request->input('source');
        $date = $request->input('date');
        $limit = $request->limit;

        // Retrieve articles based on user preferences using the $newsAPI service
        $articles = $this->newsAPI->getArticlesByPreferences($keyword, $category, $source, $date, $limit);

        $sources = $this->newsAPI->getAllSources();
        $categories = Category::get();

        $user_categories = json_decode($user->categories, true);
        $user_sources = json_decode($user->sources, true);

        return response()->json(array(
            'articles' => $articles,
            'sources' => $sources,
            'categories' => $categories,
            'userSources' => $user_sources,
            'userCategories' => $user_categories,
            'date' => $date,
        ));
    }

    public function getAllPreferences(Request $request)
    {
        /** @var User $user*/
        $user = Auth::user();

        $user_categories = json_decode($user->categories, true);
        $user_sources = json_decode($user->sources, true);

        $categories = Category::get();
        $sources = $this->newsAPI->getAllSources();

        return response()->json(array(
            'sources' => $sources,
            'categories' => $categories,
            'userCategories' => $user_categories,
            'userSources' => $user_sources,
        ));
    }
}
