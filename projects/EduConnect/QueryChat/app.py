import json
import streamlit as st
import os
import google.generativeai as genai
from PIL import Image

from dotenv import load_dotenv
load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Function to load field prompts from JSON file
def load_field_prompts(filepath):
  with open(filepath, 'r') as f:
    return json.load(f)

# Load field prompts from a JSON file (replace 'prompts.json' with your actual filename)
field_prompts = load_field_prompts('prompts.json')

default_prompt = "As a research assistant specializing in analyzing architecture and system model diagrams from research papers, and also an expert in solving math problems "

model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

def get_gemini_response(question, field):
  prompt = field_prompts[field] + question
  response = chat.send_message(prompt, stream=True)
  return response

def get_gemini_image_response(input_text, image):
  model = genai.GenerativeModel('gemini-pro-vision')
  if input_text != "":
      prompt = default_prompt + input_text
  else:
      prompt = default_prompt
  response = model.generate_content([prompt, image])
  return response.text

def main():
  st.set_page_config(page_title="Query Chat Assistant ")

  if 'chat_history' not in st.session_state:
      st.session_state['chat_history'] = []

  st.sidebar.markdown("# Navigation")
  page = st.sidebar.radio("", ["Text-Based Query", "Image Analysis"])

  if page == "Text-Based Query":
      text_based_query()
  elif page == "Image Analysis":
      image_analysis()

def text_based_query():
  st.header("Text-Based Query Assistant ")
  selected_field = st.selectbox("Select Field:", list(field_prompts.keys()))
  input_text = st.text_input("Ask your question: ", key="input")
  submit = st.button("Submit")

  if submit and input_text:
      response = get_gemini_response(input_text, selected_field)
      st.session_state['chat_history'].append(("You", input_text))
      st.subheader("The Response is")
      for chunk in response:
          st.write(chunk.text)
          st.session_state['chat_history'].append(("Bot", chunk.text))
      st.markdown("---")

  st.subheader("The Chat History is")
  for role, text in st.session_state['chat_history']:
      st.write(f"{role}: {text}")

def image_analysis():
  st.header("Image Analysis Assistant ️")
  input_text = st.text_input("Input: ", key="input")
  uploaded_file = st.file_uploader("Choose an image to analyze...", type=["jpg", "jpeg", "png"])
  image = ""
  if uploaded_file is not None:
      image = Image.open(uploaded_file)
      st.image(image, caption="Uploaded image", use_column_width=True)
  
  submit = st.button("Analyze the image")

  if submit:
      response = get_gemini_image_response(input_text, image)
      st.subheader("Analysis Result")
      st.write(response)

if __name__ == "__main__":
  main()
