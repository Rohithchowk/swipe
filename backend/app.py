from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from flask_cors import CORS
from werkzeug.utils import secure_filename
import fitz 
import json  
import re

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

MODEL_CONFIG = {
    "temperature": 0.2,
    "top_p": 1,
    "top_k": 32,
    "max_output_tokens": 4096,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash-latest",
    generation_config=MODEL_CONFIG,
    safety_settings=safety_settings,
)

def extract_text_from_pdf(pdf_path):
    """Extracts text from each page of a PDF."""
    doc = fitz.open(pdf_path)
    pages_text = []
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num) 
        page_text = page.get_text("text") 
        pages_text.append(page_text)
    return pages_text



def clean_response_text(response_text):
    """
    Cleans up the response from the Gemini API by removing Markdown formatting,
    isolating JSON objects from descriptive text, and removing comments from malformed JSON.
    """
    response_text = response_text.strip()
    if "```json" in response_text:
        match = re.search(r"```json\s+(.*?)\s+```", response_text, re.DOTALL)
        if match:
            response_text = match.group(1)
    elif "```" in response_text:
        match = re.search(r"```(.*?)```", response_text, re.DOTALL)
        if match:
            response_text = match.group(1)
    
    response_text = re.sub(r"//.*", "", response_text)

    response_text = re.sub(r"(\d+\.\d+/\d+)", lambda m: str(eval(m.group(0))), response_text)

    try:
        return json.loads(response_text)
    except json.JSONDecodeError:
        return {"error": "Failed to parse JSON", "raw_response": response_text}

def image_format(image_path):
    """Formats image data for the Gemini API."""
    from pathlib import Path
    img = Path(image_path)
    if not img.exists():
        raise FileNotFoundError(f"Could not find image: {img}")
    image_parts = [
        {
            "mime_type": "image/png", 
            "data": img.read_bytes()
        }
    ]
    return image_parts

def process_image(image_path, system_prompt, user_prompt):
    """Processes an image file with the Gemini API."""
    image_info = image_format(image_path)
    input_prompt = [system_prompt, image_info[0], user_prompt]
    response = model.generate_content(input_prompt)
    cleaned_response = clean_response_text(response.text)
    return {"response": cleaned_response}

def process_pdf(pdf_path, system_prompt, user_prompt):
    """Processes an entire PDF file with the Gemini API as a single input."""
    pages_text = extract_text_from_pdf(pdf_path)
    combined_text = "\n".join(pages_text)

    max_length = 5000  
    if len(combined_text) > max_length:
        combined_text = combined_text[:max_length] + "... [Truncated]"

    input_prompt = [system_prompt, combined_text, user_prompt]

    response = model.generate_content(input_prompt)

    cleaned_response = clean_response_text(response.text)
    return {"response": cleaned_response}

def allowed_file(filename):
    """Checks if the uploaded file has an allowed extension."""
    return filename.lower().endswith(('.png', '.jpg', '.jpeg', '.pdf'))

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    system_prompt = request.form['system_prompt']
    user_prompt = request.form['user_prompt']
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join("uploads", filename)
        file.save(file_path)

        if filename.endswith('.pdf'):
            response = process_pdf(file_path, system_prompt, user_prompt)  
        else:
            response = process_image(file_path, system_prompt, user_prompt)

        return jsonify(response), 200

    return jsonify({"error": "Invalid file format!"}), 400

if __name__ == '__main__':
    app.run(debug=True)
