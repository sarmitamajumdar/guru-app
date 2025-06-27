# backend/test_gemini.py
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-pro")
response = model.generate_content("Say hello in Bengali.")
print(response.text)
