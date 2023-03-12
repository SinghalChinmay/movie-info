from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from os import getenv
import requests

app = FastAPI()
load_dotenv()
TOKEN = getenv("TOKEN")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

base_url = "https://api.themoviedb.org/3"
search_url = "https://api.themoviedb.org/3/search"

langs = requests.get(f"{base_url}/configuration/languages?api_key={TOKEN}")
lang_data = langs.json()
languages = {}
for i in lang_data:
    original = i["iso_639_1"]
    english = i["english_name"]
    languages[original] = english


@app.get("/")
def search(q: str, tv_or_movie: str, response: Response):
    req = requests.get(f"{search_url}/{tv_or_movie}?api_key={TOKEN}&query={q}")
    req_data = req.json()

    if len(req_data["results"]) == 0:
        response.status_code == status.HTTP_404_NOT_FOUND
        return {
            "error": "TV Show/Movie not found",
        }
    new_req = requests.get(
        f"{base_url}/{tv_or_movie}/{req_data['results'][0]['id']}?api_key={TOKEN}"
    )
    data = new_req.json()
    language = languages[data["original_language"]]
    return data, {"language": language}
