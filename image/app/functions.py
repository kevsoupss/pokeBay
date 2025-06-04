from ultralytics import YOLO
import cv2 
import numpy as np
import imagehash
from PIL import Image

async def getCardBoundingBoxes(model, file, card_metadata, kdt):
    results = model.predict(file, conf=0.80)  
    cards = []
    for result in results:
        boxes = result.boxes
        for box in boxes:

            b = box.xyxy[0].to('cpu').detach().numpy().tolist()
            idx = getCardDetails(file, b, kdt)
            cards.append(card_metadata.iloc[idx].id)
    return cards


def preprocess_img(img):
    return img.convert("RGB").resize((256,256), Image.LANCZOS)

def getCardDetails(file, bb, kdt):
    [x_min, y_min, x_max, y_max] = bb
    cropped_region = file.crop((x_min, y_min, x_max, y_max))
    #cropped_region = preprocess_img(cropped_region)
    imghash = combined_hash(cropped_region)

    dist, idx = kdt.query(imghash, k=1, p=1)
    return idx


def combined_hash(img):
    phash = imagehash.phash(img).hash.astype(int).flatten()
    ahash = imagehash.average_hash(img).hash.astype(int).flatten()
    whash = imagehash.whash(img).hash.astype(int).flatten()
    colorhash = imagehash.colorhash(img).hash.astype(int).flatten()
    imghash = np.hstack((phash, ahash, whash, colorhash))
    return(imghash)