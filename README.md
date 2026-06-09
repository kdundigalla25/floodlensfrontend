# Flood Visualization Frontend

Modern React frontend for visualizing estimated flood water reach on homes using address lookup, Street View fallback, image upload, and ground-line calibration.

## Overview

This app lets users enter a home address, checks whether a Google Street View image can be used, and falls back to manual photo upload if Street View is unavailable. Users can then mark the approximate ground line of the home so the flood preview can place a visual waterline more accurately.

## Features

- Address-first upload flow
- Google Street View image support through backend API
- Manual image upload fallback
- Interactive ground-line calibration
- Animated flood water preview
- Modern responsive UI with React, TypeScript, Tailwind CSS, and Framer Motion
- Temporary session-based image/result storage without requiring a database

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- FastAPI backend integration

## Main Flow

```txt
Enter address
→ Check for Street View image
→ If available, generate preview
→ If unavailable, upload image manually
→ Mark ground line
→ Generate flood visualization
