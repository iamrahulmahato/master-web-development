import random

def number_guessing_game():
    # Difficulty level
    print("\n🎯 Welcome to the Number Guessing Game!")
    print("Choose a difficulty level:")
    print("1. Easy (12 attempts)\n2. Medium (8 attempts)\n3. Hard (5 attempts)")

    while True:
        difficulty = input("Select difficulty (1/2/3): ").strip()
        if difficulty == '1':
            max_attempts = 12
            break
        elif difficulty == '2':
            max_attempts = 8
            break
        elif difficulty == '3':
            max_attempts = 5
            break
        else:
            print("⚠️ Invalid choice. Please select 1, 2, or 3.")

    # Initialize game variables
    secret_number = random.randint(1, 100)
    guesses = 0
    low, high = 1, 100 

    print(f"\nI'm thinking of a number between 1 and 100. You have {max_attempts} attempts to guess it!")

    while guesses < max_attempts:
        try:
            guess = int(input(f"Attempt {guesses + 1}/{max_attempts}: Enter your guess: "))
        except ValueError:
            print("⚠️ Invalid input! Please enter a valid number.")
            continue

        guesses += 1

        if guess == secret_number:
            print(f"🎉 Congratulations! You guessed the number in {guesses} attempts.")
            break
        elif guess < secret_number:
            print("⬆️ Too low!")
            low = max(low, guess + 1)
        else:
            print("⬇️ Too high!")
            high = min(high, guess - 1)

        # Provide a hint every 3rd incorrect guess
        if guesses % 3 == 0 and guesses < max_attempts:
            print(f"💡 Hint: The number is between {low} and {high}.")

    # If the player runs out of attempts
    if guesses == max_attempts and guess != secret_number:
        print(f"❌ You're out of attempts! The correct number was {secret_number}.")

    # Play again option
    replay = input("\nDo you want to play again? (yes/no): ").strip().lower()
    if replay == 'yes':
        number_guessing_game()
    else:
        print("👋 Thanks for playing! Goodbye.")

if __name__ == "__main__":
    number_guessing_game()
