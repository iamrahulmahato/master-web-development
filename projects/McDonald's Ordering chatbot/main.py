import requests
from bs4 import BeautifulSoup
import re

# Dictionary to map emotions to IMDb URLs
URLS = {
    "Si-Fi": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=sci-fi&countries=IN&languages=hi',
    "Romance": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=romance&countries=IN&languages=hi',
    "Thriller": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=thriller&countries=IN&languages=hi',
    "Adventure": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=adventure&countries=IN&languages=hi',
    "Fantasy": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=fantasy&countries=IN&languages=hi',
    "Mystery": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=mystery&countries=IN&languages=hi',
    "Animation": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=animation&countries=IN&languages=hi',
    "Family": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=family&countries=IN&languages=hi',
    "Biography": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=biography&countries=IN&languages=hi',
    "History": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=history&countries=IN&languages=hi',
    "Music": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=music&countries=IN&languages=hi',
    "War": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=war&countries=IN&languages=hi',
    "Drama": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=drama&countries=IN&languages=hi',
    "Action": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=action&countries=IN&languages=hi',
    "Comedy": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=comedy&countries=IN&languages=hi',
    "Horror": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=horror&countries=IN&languages=hi',
    "Crime": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=crime&countries=IN&languages=hi',
    "Musical": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=musical&countries=IN&languages=hi',
    "News": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=news&countries=IN&languages=hi',
    "Western": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=western&countries=IN&languages=hi',
    "Sport": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=sport&countries=IN&languages=hi',
    "Documentary": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=documentary&countries=IN&languages=hi',
    "Talk-Show": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=talk-show&countries=IN&languages=hi',
    "Reality-TV": 'https://www.imdb.com/search/title/?title_type=feature&user_rating=2.1,10&genres=reality-tv&countries=IN&languages=hi',

}

def main(emotion):
    url = URLS.get(emotion)
    print("ok", url)
    if not url:
        print("Invalid emotion.")
        return []

    headers = {
    'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Check for HTTP errors
    except requests.RequestException as e:
        print(f"Error fetching data: {e}")
        return []

    soup = BeautifulSoup(response.text, "lxml")

    # Extract movie titles

    titles = [a.get_text() for a in soup.find_all('a', href=re.compile(r'/title/tt\d+/'))]
   # print(titles)
    return titles

# Driver Function
if __name__ == '__main__':
    emotion = input("Enter the emotion: ").strip()
    movie_titles = main(emotion)

    if not movie_titles:
        print("No titles found.")
    else:
        max_titles = 20 if emotion in ["Drama", "Action", "Comedy", "Horror", "Crime","Si-Fi", "Romance","Thriller","Adventure","Fantasy","Mystery","Animation","Family","Biography","History","Music","War","News","Western","Sport","Documentary","Talk-Show","Reality-TV"] else 12
        for title in movie_titles[:max_titles]:
            print(title)
