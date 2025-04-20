from ultralytics import YOLO

async def getCardBoundingBoxes(model, file):
    results = model.predict(file, save=True, conf=0.50)  

    cards = []
    for result in results:
        boxes = result.boxes
        for box in boxes:

            b = box.xyxy[0].to('cpu').detach().numpy().tolist()
            cards.append({
                "x1": b[0],
                "y1": b[1],
                "x2": b[2],
                "y2": b[3],
            })
    print(cards)
    return cards