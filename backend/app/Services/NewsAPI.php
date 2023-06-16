<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

use function PHPUnit\Framework\isEmpty;

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

    public function getArticles($keyword, $category, $date, $limit)
    {
        if (empty($keyword) && empty($category)) {
            $response = Http::get('https://newsapi.org/v2/top-headlines', [
                'sources' => 'abc-news,associated-press,bbc-news,bloomberg,cnn,espn,financial-times,fox-news,google-news,nbc-news,the-new-york-times,reuters,the-guardian,the-washington-post,usa-today',
                'pageSize' => $limit,
                'apiKey' => $this->apiKey,
            ]);
        } else {
            $response = Http::get('https://newsapi.org/v2/top-headlines', [
                'q' => $keyword,
                'category' => strtolower($category),
                'from' => $date,
                'pageSize' => $limit,
                'apiKey' => $this->apiKey,
            ]);
        }
        $data = $response->json();

        $articles = [];
        if (isset($data['articles'])) {
            foreach ($data['articles'] as $article) {
                $title = $article['title'];
                $description = $article['description'];
                $source_name = $article['source']['name'];
                $author = $article['author'];
                $publishing_date = $article['publishedAt'];
                $url = $article['url'];
                $image_url = $article['urlToImage'];

                $article_obj = [
                    'title' => $title,
                    'description' => $description,
                    'source_name' => $source_name,
                    'author' => $author,
                    'publishing_date' => $publishing_date,
                    'url' => $url,
                    'image_url' => $image_url
                ];

                $articles[] = $article_obj;
            }
        }

        return $articles;
    }
}
