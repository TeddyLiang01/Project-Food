import google.generativeai as genai
import os

token = "AIzaSyD_mJVtd99WdXDmYiHCp1NSlbO7weB-IhE"

genai.configure(api_key=token)
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Write a story about a magic backpack.")
print(response.text)