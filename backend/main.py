from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from googletrans import Translator

app = FastAPI()
translator = Translator()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/translate/")
def translate_text(text: str = Body(...), target_lang: str = Body(...)):
    try:
        translated = translator.translate(text, dest=target_lang)
        return {"translated": translated.text}
    except Exception as e:
        return {"error": str(e)}
