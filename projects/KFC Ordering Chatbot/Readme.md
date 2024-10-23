KFC Ordering Chatbot
This project implements a basic chatbot using the NLTK library to simulate a KFC ordering assistant. The chatbot helps users navigate KFC's menu, customize their orders, and place or cancel orders in a conversational manner.

Features
Greeting: Welcomes the user and offers assistance with their order.
Menu Inquiries: Users can ask about the menu, and the bot will provide categories like fried chicken, burgers, sides, and drinks.
Fried Chicken and Burger Options: Lists available fried chicken and burger options when asked.
Order Customization: Users can choose burgers and customize with combos, fries, and drinks.
Sides and Desserts: Users can add sides or desserts to their orders.
Order Confirmation or Cancellation: Users can confirm or cancel their orders.
Help and Support: The bot offers help when requested.
Goodbye: Ends the conversation when the user says goodbye.
Prerequisites
To run this chatbot, you need to have the following installed:

Python: Ensure Python 3.x is installed on your system. You can download it from here.
NLTK: Install the Natural Language Toolkit (NLTK) library.
Installation Steps
Install the necessary library:

bash
Copy code
pip install nltk
Ensure you have downloaded the required NLTK resources:

python
Copy code
import nltk
nltk.download('punkt')
Running the Chatbot
Clone or download this repository to your local machine.

Open the terminal or command prompt in the project folder.

Run the chatbot script by executing:

bash
Copy code
python kfc_chatbot.py
The chatbot will start interacting with you. You can ask questions about the KFC menu, customize your order, and finalize it by chatting with the bot.

Example Conversation
vbnet
Copy code
You: Hi
Bot: Hello! Welcome to KFC. How can I assist you with your order today?

You: Show me the menu
Bot: We offer a variety of fried chicken, burgers, sides, and drinks. Would you like to see our fried chicken, burgers, sides, or drinks?

You: Fried chicken
Bot: We have Original Recipe Chicken, Hot & Crispy Chicken, and Chicken Tenders. Which one would you like to order?

You: Hot & Crispy Chicken
Bot: Perfect! Would you like to add any sides or desserts?

You: Place order
Bot: Your order has been placed! Thank you for choosing KFC. We will deliver it to you soon.
How it Works
Chatbot Framework: The bot uses nltk.chat.util.Chat from the NLTK library to handle pattern-matching based conversations.
Reflections: The reflections dictionary allows simple responses to be adapted to the user’s input, changing pronouns like "I" to "you".
Pattern-Response Matching: Regular expressions are used to define patterns for common inputs like greetings, menu inquiries, and order placement.
Customization
Feel free to add more patterns and responses to enhance the bot’s functionality. You can modify the patterns in the patterns_responses list to include more menu items or improve user interaction.