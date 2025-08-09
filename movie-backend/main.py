import os
import random
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://useless-beryl.vercel.app"],  # Use your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE_URL = "https://api.themoviedb.org/3"

@app.get("/genres")
async def get_genres():
    url = f"{TMDB_BASE_URL}/genre/movie/list?api_key={TMDB_API_KEY}"
    response = requests.get(url)
    return response.json()

@app.get("/discover/{genre_id}")
async def get_movies_by_genre(genre_id: int):
    url = f"{TMDB_BASE_URL}/discover/movie?api_key={TMDB_API_KEY}&with_genres={genre_id}&sort_by=popularity.desc"
    response = requests.get(url)
    return response.json()

@app.get("/movie/{movie_id}")
async def get_movie_mashup(movie_id: int):
    # Get the CORRECT movie details
    correct_movie_url = f"{TMDB_BASE_URL}/movie/{movie_id}?api_key={TMDB_API_KEY}"
    correct_response = requests.get(correct_movie_url).json()

    # Get a RANDOM movie for the plot
    random_page = random.randint(1, 100)
    random_movie_list_url = f"{TMDB_BASE_URL}/movie/popular?api_key={TMDB_API_KEY}&page={random_page}"
    random_movie_list = requests.get(random_movie_list_url).json()["results"]
    random_movie = random.choice(random_movie_list)

    # Combine them into a single response
    mashed_up_data = {
        "id": correct_response["id"],
        "title": correct_response["title"],
        "poster_path": correct_response["poster_path"],
        "overview": random_movie["overview"],
        "vote_average": random_movie["vote_average"],
        "release_date": random_movie["release_date"]
    }
    return mashed_up_data