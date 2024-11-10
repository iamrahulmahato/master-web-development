# animalmatch

Animal Match is a simple pair-matching memory game where the player turns over pairs of cards and tries to find matching animals. This game is implemented in pure JavaScript using localStorage for leaderboards, so can easily be cheated using the console or modifying web elements, but short of a server-client implementation this is unavoidable. It's still fun to play!




There are four single-player gamemodes:
 - Classic (finding pairs of animals)
 - 3-match (still 12 unique animals, but now there are 3 of each)
 - 4-match (finding sets of 4 of each animal)
 - 6-match (you guessed it: 6 of each animal to find)

Naturally, these get progressively harder.

For single-player modes, highscores are stored in a leaderboard for each gamemode. Names are limited to exactly 3 characters long, reminiscent of old-school videogame leaderboards.

On the menu page there is the option to align cards in a grid. This generally makes playing the game easier, so a star is left by the player's name on the leaderboard to indicate this assistance was used.

There is one 2-player gamemode:
 - Competitive mode (play against a friend)

When playing with two players, either the mouse or the appropriate keys on the keyboard can be used to turn over cards.
The player who turns over a matching animal on their turn gets a point!
