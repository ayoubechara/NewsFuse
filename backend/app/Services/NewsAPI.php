<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class NewsAPI
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://newsapi.org/v2/',
        ]);
        $this->apiKey = config('services.newsapi.api_key');
    }

    public function getAllSources()
    {
        $response = Http::get('https://newsapi.org/v2/sources', [
            'apiKey' => $this->apiKey,
        ]);
        if ($response->successful()) {
            $sources = $response->json()['sources'];

            return $sources;
        } else {
            return null;
        }
    }

    public function getArticlesByPreferences($keyword, $category, $source, $date, $limit)
    {
        /** @var User $user*/
        $user = Auth::user();

        $user_sources = implode(",", json_decode($user->sources, true));

        if (!$keyword && !$category && !$source) {
            $source = $user_sources;
        }
        $query = [
            'apiKey' => $this->apiKey,
            'q' => $keyword,
            'category' => $category,
            'sources' => $source,
            'from' => $date,
            'pageSize' => $limit,
            'language' => 'en',
            'sortBy' => 'publishedAt'
        ];
        if ($category) {
            $response = $this->client->get('top-headlines', ['query' => $query]);
        } else {
            $response = $this->client->get('everything', ['query' => $query]);
        }
        $articles = json_decode($response->getBody(), true)['articles'];

        return $articles;
    }

    public function getUserCategories()
    {
        /** @var User $user*/
        $user = Auth::user();

        $result = $user->categories()->get();
        return response()->json($result);
    }
}
