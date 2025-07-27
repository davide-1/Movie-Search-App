# 🎬 Movie Search App

A responsive movie search application built with **React**, **TypeScript**, **Material UI**, **React Hook Form**, and **React Query**, powered by **The Movie Database (TMDB)** API.

Users can search for movies, view detailed information, and manage a list of favorites — all with smooth UI transitions, validation, and robust error handling.

## 🚀 Features

- 🔍 **Live movie search**
- 🧾 **Form validation** with React Hook Form
- 🎬 **Movie details page** (runtime, genres, overview, backdrop)
- ❤️ **Favorites** feature using `useReducer`
- 💎 **Material UI design** with responsive layout
- 🔁 **API error handling** with retry logic
- 💡 **Debounced search** for better performance
- 📦 **State management** with React Query + useState/useReducer
- 🎥 **TMDB integration** for real-time movie data

---

## 🧪 Tech Stack

- **React + TypeScript**
- **Material UI v7**
- **React Hook Form**
- **React Query (TanStack Query)**
- **TMDB API**

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/davide-1/Movie-Search-App.git
cd Movie-Search-App

2. Install dependencies
npm install

3. Setup environment variables
Create a .env file in the root of the project and add your TMDB API key:
VITE_TMDB_KEY=your_tmdb_api_key

You can get your API key from The Movie Database.

4. Run the development server
npm run dev