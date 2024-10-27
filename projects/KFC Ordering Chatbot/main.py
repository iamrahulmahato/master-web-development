import nltk
from nltk.chat.util import Chat, reflections

# Define a list of patterns and responses for KFC ordering bot
patterns_responses = [

    # Greeting
    [r'Hi|hi|Hello|hello|Hey|hey', ['Hello! Welcome to KFC. How can I assist you with your order today?']],

    # Menu Inquiries
    [r'What is on the menu|Show me the menu|Menu', ['We offer a variety of fried chicken, burgers, sides, and drinks. Would you like to see our fried chicken, burgers, sides, or drinks?']],

    # Fried Chicken Options
    [r'What fried chicken do you have|List of fried chicken|Fried chicken', ['We have Original Recipe Chicken, Hot & Crispy Chicken, and Chicken Tenders. Which one would you like to order?']],

    # Burger Options
    [r'What burgers do you have|List of burgers|Burgers', ['We offer Zinger Burger, Chicken Fillet Burger, and Double Down. Which one would you like to order?']],

    # Customization
    [r'I want a (.*) burger', ['Great choice! Would you like to make it a combo with fries and a drink?']],
    [r'Yes, make it a combo|Combo', ['Awesome! What size fries would you like? Small, Medium, or Large?']],
    [r'(.*) fries', ['Got it! What drink would you like to add? We offer Pepsi, 7-Up, and Mountain Dew.']],
    [r'(.*) drink', ['Perfect! Would you like to add any sides or desserts?']],

    # Sides and Drinks
    [r'What sides do you have|List of sides|Sides', ['We offer Mashed Potatoes, Coleslaw, and Corn on the Cob. Would you like to add any sides to your order?']],
    [r'What drinks do you have|List of drinks|Drinks', ['We offer Pepsi, 7-Up, and Mountain Dew. What would you like to drink?']],

    # Desserts
    [r'What desserts do you have|Desserts', ['We have Chocolate Chip Cookie, Soft Serve, and Brownie. Would you like to add a dessert to your order?']],

    # Order Confirmation
    [r'Yes|Confirm|Place order', ['Your order has been placed! Thank you for choosing KFC. We will deliver it to you soon.']],

    # Cancel Order
    [r'Cancel my order|I want to cancel', ['Your order has been canceled. Is there anything else I can assist you with?']],

    # Help and Support
    [r'I need help|Help me', ['I am here to help. What do you need assistance with?']],

    # Goodbye
    [r'Bye|Goodbye|See you', ['Goodbye! Thank you for choosing KFC. Enjoy your meal!']]
]

# Create a Chat object
chatbot = Chat(patterns_responses, reflections)

# Function to interact with the chatbot
def chat_with_bot():
    print("Hello! I am your KFC chatbot. Type 'Bye' to exit.")
    while True:
        user_input = input("You: ")
        response = chatbot.respond(user_input)
        print("Bot:", response)
        if response in ('Goodbye! Thank you for choosing KFC. Enjoy your meal!', 'Bye'):
            break

# Run the chatbot
if __name__ == "__main__":
    chat_with_bot()
