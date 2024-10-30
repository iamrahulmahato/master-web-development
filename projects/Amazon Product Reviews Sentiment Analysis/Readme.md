Amazon Product Reviews Sentiment Analysis
This project performs sentiment analysis on Amazon product reviews using a logistic regression model. The objective is to classify reviews as positive or negative based on their textual content. We use the TF-IDF vectorizer to process the text and build a binary classification model.

Table of Contents
Overview
Dataset
Data Preprocessing
Model Training and Evaluation
Dependencies
Usage
Results
License
Overview
The project uses a dataset of Amazon reviews with labels representing the sentiment (positive or negative). The reviews are preprocessed, vectorized using TF-IDF, and classified using a logistic regression model.

Dataset
The dataset used for this project, AmazonReview.csv, contains:

Review: The text of the review.
Sentiment: The sentiment label, initially ranging from 1 to 5.
Label Conversion
Reviews with ratings from 1 to 3 are labeled as negative (0).
Reviews with ratings 4 and 5 are labeled as positive (1).
Data Preprocessing
Removing Stopwords: Uses NLTK's stopwords list to remove common, non-informative words.
Cleaning: Each review is processed to remove stopwords and retain significant words only.
TF-IDF Vectorization: The cleaned reviews are vectorized with TfidfVectorizer to convert text data into numerical format suitable for model training.
Model Training and Evaluation
Split Data: The data is split into training and test sets (75%-25%).
Model Selection: A logistic regression model is used for binary classification.
Model Evaluation:
Accuracy Score: Evaluates the percentage of correct predictions on the test data.
Confusion Matrix: Displays the count of true positives, false positives, true negatives, and false negatives to assess model performance.
Dependencies
Python 3.x
Libraries: pandas, nltk, sklearn, matplotlib, wordcloud
Installing the Libraries
Install the dependencies via pip:

bash
Copy code
pip install pandas nltk scikit-learn matplotlib wordcloud
NLTK Stopwords
To use NLTK's stopwords, you need to download the relevant NLTK packages:

python
Copy code
import nltk
nltk.download('punkt')
nltk.download('stopwords')
Usage
Prepare Dataset: Place the AmazonReview.csv file in the working directory.
Run the Script: Execute the Python script for preprocessing, model training, and evaluation.
Review Results: The script will output the accuracy and confusion matrix of the trained model.
Results
The model's accuracy is printed after testing, along with a confusion matrix plot to visually evaluate the model's performance in terms of correctly and incorrectly classified sentiments.