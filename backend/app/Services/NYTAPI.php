<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class NYTAPI
{

    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.nyt_api.api_key');
    }

    public function getArticles($keyword, $category, $date, $limit)
    {
        if (!empty($keyword)) {
            $response = Http::get('https://api.nytimes.com/svc/search/v2/articlesearch.json', [
                'q' => 'latest',
                'fq' => $category,
                'begin_date' => $date,
                'page' => 0,
                'page_size' => $limit,
                'api-key' => $this->apiKey,
            ]);
        } else {
            $response = Http::get('https://api.nytimes.com/svc/search/v2/articlesearch.json', [
                'q' => $keyword,
                'fq' => $category,
                'begin_date' => $date,
                'page' => 0,
                'page_size' => $limit,
                'api-key' => $this->apiKey,
            ]);
        }
        $articles = [];

        if ($response->successful()) {
            $responseData = $response->json();

            foreach ($responseData['response']['docs'] as $article) {
                $title = $article['headline']['main'];
                $description = $article['abstract'];
                $sourceName = $article['source'];
                $author = $article['byline']['original'];
                $publishingDate = $article['pub_date'];
                $url = $article['web_url'];
                $image_url = null;

                if (isset($article['multimedia'][0]['url'])) {
                    $image_url = 'https://www.nytimes.com/' . $article['multimedia'][0]['url'];
                }

                $articles[] = [
                    'title' => $title,
                    'description' => $description,
                    'source_name' => $sourceName,
                    'author' => $author,
                    'publishing_date' => $publishingDate,
                    'url' => $url,
                    'image_url' => $image_url
                ];
            }
            return $articles;
        } else {
            return null;
        }
    }
}
