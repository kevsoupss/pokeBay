from ultralytics import YOLO
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
from app.functions import getCardBoundingBoxes
from PIL import Image, ImageOps
import io
import uuid
import boto3
from dotenv import load_dotenv
import os
import numpy as np
from pathlib import Path
import pandas as pd
from scipy import spatial

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

# fastAPI object
app = FastAPI()

# Yolo Model
model_path = Path(__file__).parent / "data" / "best.pt"
hash_path = Path(__file__).parent / "data" / "card_hash_array.npy"
metadata_path = Path(__file__).parent / "data" / "card_metadata.csv"

model = YOLO(model_path)

# Hash Array
hash_array = np.load(hash_path)

# Metadata
card_metadata = pd.read_csv(metadata_path)

kdt = spatial.KDTree(hash_array)

# API Operations
@app.get("/")
def health_check():
    return {'health_check' : 'OK'}

# returns bounding boxes of images
@app.put("/cards/{user}")
async def get_bucket(user):
    key = f"{user}/image.jpg"
    try:
        response = s3.get_object(Bucket=AWS_BUCKET_NAME, Key=key)
        image_bytes = response["Body"].read()
        image = Image.open(io.BytesIO(image_bytes))
        image = ImageOps.exif_transpose(image) # make image flipped the right way
        cards = await getCardBoundingBoxes(model, image, card_metadata, kdt)
        print( cards)
        return {"cards": cards}
    except Exception as e:
        print(f"Error loading image: {e}")
        return {"error": e}

@app.get("/info")
def info():
    return {'name' : 'info', 'description': "search api"}
