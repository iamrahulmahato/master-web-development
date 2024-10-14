from flask import Flask, request, render_template, send_file
from PIL import Image
import os

app = Flask(__name__)

# Ensure upload folder exists
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/resize', methods=['POST'])
def resize_image():
    if 'image' not in request.files:
        return 'No file uploaded', 400

    image_file = request.files['image']
    width = request.form.get('width', type=int)
    height = request.form.get('height', type=int)

    # Open the image file
    img = Image.open(image_file)

    # Resize the image using LANCZOS as the resampling filter
    resized_img = img.resize((width, height), Image.LANCZOS)

    # Save resized image
    resized_image_path = os.path.join(UPLOAD_FOLDER, 'resized_image.png')
    resized_img.save(resized_image_path)

    return send_file(resized_image_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
