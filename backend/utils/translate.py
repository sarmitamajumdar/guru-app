from dotenv import load_dotenv
import os

load_dotenv()  # Loads .env file
print("KEY:", os.getenv("GOOGLE_TRANSLATE_API_KEY"))
