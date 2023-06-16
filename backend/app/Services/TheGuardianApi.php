<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TheGuardianApi
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.theguardian_api.api_key');
    }

    public function getArticles($keyword, $category, $date, $limit)
    {
        if (!$category) $category = 'world';
        $response = Http::get('https://content.guardianapis.com/search', [
            'q' => $keyword,
            'section' => strtolower($category),
            'from-date' => $date,
            'page-size' => $limit,
            'show-fields' => 'thumbnail',
            'api-key' => $this->apiKey,
        ]);
        $articles = [];

        $data = $response->json();

        // Process the articles
        $articles = [];

        if ($response->successful()) {
            foreach ($data['response']['results'] as $article) {
                $title = $article['webTitle'];
                $description = $article['fields']['trailText'] ?? null;
                $source_name = 'The Guardian';
                $author = $article['fields']['byline'] ?? null;
                $publishing_date = $article['webPublicationDate'];
                $url = $article['webUrl'];
                $image_url = null;
                if (isset($article['fields']['thumbnail'])) {
                    $image_url = $article['fields']['thumbnail'];
                }

                // Create the article object
                $article_obj = [
                    'title' => $title,
                    'description' => $description,
                    'source_name' => $source_name,
                    'author' => $author,
                    'publishing_date' => $publishing_date,
                    'url' => $url,
                    'image_url' => $image_url
                ];

                // Add the article object to the list
                $articles[] = $article_obj;
            }
            return $articles;
        } else {
            return null;
        }
    }
}
