from ultralytics import YOLO
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
from functions import getCardBoundingBoxes
from PIL import Image, ImageOps
import io
import uuid
import boto3
from dotenv import load_dotenv
import os
import numpy as np

load_dotenv()  

# load s3 credential
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION")
AWS_BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")

s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

# Load model
model = YOLO("data/best.pt") 

# fastAPI object
app = FastAPI()

# API Operations
@app.get("/")
def health_check():
    return {'health_check' : 'OK'}

# returns bounding boxes of images
@app.get("/bounding-box")
async def get_bucket():
    response = s3.get_object(Bucket=AWS_BUCKET_NAME, Key="kevinleimc@gmail.com/image.jpg")
    try:
        image_bytes = response["Body"].read()
        image = Image.open(io.BytesIO(image_bytes))
        image = ImageOps.exif_transpose(image) # make image flipped the right way
        cards = await getCardBoundingBoxes(model, image)
        return {"cards": cards}
    except Exception as e:
        print(f"Error loading image: {e}")

    #return StreamingResponse(response["Body"], media_type="image/jpeg")

@app.get("/info")
def info():
    return {'name' : 'info', 'description': "search api"}
