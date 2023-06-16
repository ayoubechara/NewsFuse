<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Services\NewsAPI;
use App\Services\NYTAPI;
use App\Services\TheGuardianApi;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    protected $newsAPI;
    protected $nytAPI;
    protected $theGuardianApi;

    public function __construct(NewsAPI $newsAPI, NYTAPI $nytAPI, TheGuardianApi $theGuardianApi)
    {
        $this->newsAPI = $newsAPI;
        $this->nytAPI = $nytAPI;
        $this->theGuardianApi = $theGuardianApi;
    }

    public function index(Request $request)
    {
        /** @var User $user*/
        $user = Auth::user();
        $user_sources = json_decode($user->sources, true);

        // Retrieve user preferences from the request or authenticated user
        $keyword = $request->input('keyword');
        $category = $request->input('category');
        $source = $request->input('source');
        $date = $request->input('date');
        $limit = $request->limit;

        // initializing the articles
        $newsapi_articles = [];
        $nyt_articles = [];
        $theGuardian_articles = [];

        if (!$source) {
            if (in_array('NewsAPI', $user_sources)) {
                $newsapi_articles = $this->newsAPI->getArticles($keyword, $category, $date, $limit);
            }
            if (in_array('The New York Times', $user_sources)) {
                $nyt_articles = $this->nytAPI->getArticles($keyword, $category, $date, $limit);
            }
            if (in_array('The Guardian', $user_sources)) {
                $theGuardian_articles = $this->theGuardianApi->getArticles($keyword, $category, $date, $limit);
            }
        } else {
            if ($source == 'NewsAPI') {
                $newsapi_articles = $this->newsAPI->getArticles($keyword, $category, $date, $limit);
            }
            if ($source == 'The New York Times') {
                $nyt_articles = $this->nytAPI->getArticles($keyword, $category, $date, $limit);
            }
            if ($source == 'The Guardian') {
                $theGuardian_articles = $this->theGuardianApi->getArticles($keyword, $category, $date, $limit);
            }
        }

        // to make sure we dont use array_merge on null
        if (!$newsapi_articles) {
            $newsapi_articles = [];
        }
        if (!$nyt_articles) {
            $nyt_articles = [];
        }
        if (!$theGuardian_articles) {
            $theGuardian_articles = [];
        }
        $allArticles = array_merge($nyt_articles, $theGuardian_articles, $newsapi_articles);

        // sorting articles by date
        usort($allArticles, function ($a, $b) {
            $dateA = strtotime($a['publishing_date']);
            $dateB = strtotime($b['publishing_date']);

            return $dateB <=> $dateA;
        });

        // getting all the categories
        $categories = Category::get();

        // getting the user categories
        $user_categories = json_decode($user->categories, true);

        return response()->json(array(
            'allArticles' => $allArticles,
            'categories' => $categories,
            'userSources' => $user_sources,
            'userCategories' => $user_categories,
        ));
    }
}
