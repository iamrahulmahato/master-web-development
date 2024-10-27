
Movie Recommendation System Based on Emotion
This is a simple Movie Recommendation System that suggests movies based on the selected genre (emotion). It scrapes movie data from IMDb for various genres and provides a list of movie titles.

Features
Genre-Based Movie Recommendations: Provides a list of movies based on the emotion/genre provided by the user.
Web Scraping from IMDb: Fetches movie titles from IMDb using BeautifulSoup.
Supports Multiple Genres: You can select from a wide range of genres like Action, Romance, Sci-Fi, Comedy, Thriller, and many more.
Installation
Clone the repository or download the source code:

bash
Copy code
git clone https://github.com/your-username/movie-recommendation-system.git
cd movie-recommendation-system
Install the required Python packages:

bash
Copy code
pip install -r requirements.txt
The required libraries are:

requests
beautifulsoup4
lxml
re (part of Python's standard library)
Usage
Run the program:

bash
Copy code
python main.py
You will be prompted to enter an emotion or genre. Choose from the following genres:

Si-Fi
Romance
Thriller
Adventure
Fantasy
Mystery
Animation
Family
Biography
History
Music
War
Drama
Action
Comedy
Horror
Crime
Musical
News
Western
Sport
Documentary
Talk-Show
Reality-TV
Based on your input, the system will fetch the top movie titles from IMDb and display them. It limits the maximum number of movies displayed:

For genres like Drama, Action, Comedy, Horror, etc., it shows up to 20 movies.
For less common genres, it shows up to 12 movies.
Example
bash
Copy code
Enter the emotion: Action
Fetching top movies...
The system will display a list of movie titles related to your selected genre (emotion).

Customization
Adding/Updating URLs: The system uses predefined URLs for scraping IMDb movie data for different genres. You can update or add new genres in the URLS dictionary in the script.

Movie Count: By default, the system shows up to 20 movies for popular genres. You can change this limit in the max_titles variable depending on your needs.

Error Handling
Invalid Emotion: If the user enters an invalid genre/emotion, the system will notify that it's not a valid choice.
Network Errors: In case of any network or fetching issues, the system will handle HTTP errors and inform the user accordingly.
Notes
Web Scraping: This program scrapes data from IMDb. Please be aware of IMDb’s Terms of Use before using this for anything beyond personal projects.
Accuracy: Since this script relies on web scraping, the format of IMDb’s page could change, which may cause the script to stop working. Be prepared to update the parsing logic if needed.