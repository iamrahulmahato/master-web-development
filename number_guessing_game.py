import random

def number_guessing_game():
    secret_number = random.randint(1, 100)
    guesses = 0

    print("Welcome to the Number Guessing Game!")
    print("I'm thinking of a number between 1 and 100.")

    while True:
        try:
            guess = int(input("Enter your guess: "))
        except ValueError:
            print("Please enter a valid number.")
            continue

        guesses += 1

        if guess == secret_number:
            print(f"Congratulations! You've guessed the number in {guesses} attempts.")
            break
        elif guess < secret_number:
            print("Too low!")
        else:
            print("Too high!")

        if guesses % 3 == 0:
            if guess < secret_number:
                print("Hint: The number is in the upper half of the remaining range.")
            else:
                print("Hint: The number is in the lower half of the remaining range.")

if __name__ == "__main__":
    number_guessing_game()
