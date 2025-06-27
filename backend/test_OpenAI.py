import os
from openai import OpenAI
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Create a chat completion
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": "Hello! How are you?"}
    ]
)

# Print GPT's response
print(response.choices[0].message.content)
