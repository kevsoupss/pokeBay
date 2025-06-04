FROM python:3.12

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app/ /code/app/

COPY ./app/data /code/app/data
CMD ["fastapi", "run", "app/main.py", "--port", "80"]