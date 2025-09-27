# PokéBay

PokéBay is a mobile application designed for Pokémon card collectors. It allows users to **scan their cards using computer vision** and automatically identify them, streamlining the process of creating eBay listings and reducing manual effort.

## Features

- **Card Detection** – Uses YOLOv11 hosted on AWS ECS to detect Pokémon cards in real-time.  
- **Card Identification** – Matches detected cards against a hashed dataset for instant recognition.  
- **Mobile-Friendly** – Built with Expo + React Native for cross-platform support.  
