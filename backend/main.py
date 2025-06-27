from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from googletrans import Translator
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load .env
load_dotenv()

# Initialize FastAPI
app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Translator endpoint
translator = Translator()
@app.post("/translate/")
def translate_text(text: str = Body(...), target_lang: str = Body(...)):
    try:
        translated = translator.translate(text, dest=target_lang)
        return {"translated": translated.text}
    except Exception as e:
        return {"error": str(e)}

# Gemini endpoint
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@app.post("/gemini-chat/")
def chat_with_gemini(prompt: str = Body(...)):
    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt)
        return {"reply": response.text}
    except Exception as e:
        return {"error": str(e)}
