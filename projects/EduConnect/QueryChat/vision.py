from dotenv import load_dotenv

load_dotenv()

import streamlit as st
import os
import pathlib
import textwrap
from PIL import Image


import google.generativeai as genai


os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

default_prompt = "As a research assistant specializing in analyzing architecture and system model diagrams from research papers, and also an expert in solving math problems "

def get_gemini_response(input_text, image):
    model = genai.GenerativeModel('gemini-pro-vision')
    if input_text != "":
        prompt = default_prompt + input_text
        response = model.generate_content([prompt, image])
    else:
        response = model.generate_content(image)
    return response.text

st.set_page_config(page_title="Query Chat Assistant 🤖")

st.header("Query Chat Assistant 🤖")

input_text = st.text_input("Input: ", key="input")

uploaded_file = st.file_uploader("Choose an image to query...", type=["jpg", "jpeg", "png"])
image = ""
if uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded image", use_column_width=True)

submit = st.button("Analyze the image")

if submit:
    prompt = default_prompt
    if input_text:
        prompt += input_text

    response = get_gemini_response(prompt, image)
    st.subheader("Analysis Result")
    st.write(response)
