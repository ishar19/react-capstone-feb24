const MOVIES = [
  {
    id: 0,
    category: "Action",
  },
  {
    id: 1,
    category: "Drama",
  },
  {
    id: 2,
    category: "Romance",
  },
  {
    id: 3,
    category: "Thriller",
  },
  {
    id: 4,
    category: "Western",
  },
  {
    id: 5,
    category: "Horror",
  },
  {
    category: "Fantasy",
    id: 6,
  },
  {
    category: "Fiction",
    id: 7,
  },
  {
    category: "Music",
    id: 8,
  },
];
import { useState } from "react";
import Box from "../components/Box";
import Chip from "../components/Chip";
import { useNavigate } from "react-router-dom";
export default function Genre() {
  const [selectedMovie, setSelectedMovie] = useState([]);
  const navigate = useNavigate();
  function handleNavigate() {
    if (selectedMovie.length < 3) return;
    localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
    navigate("/info");
  }
  return (
    <div>
      <h1>Genre</h1>
      <p>Welcome to the Genre page!</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {MOVIES.map((movie) => {
          return (
            <Box
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
              key={movie.id}
              data={movie}
            />
          );
        })}
      </div>
      <p>{selectedMovie.length < 3 ? "Minimum 3 movies are required" : null}</p>
      <div
        style={{
          display: "flex",

          gap: "12px",
        }}
      >
        {selectedMovie.length > 0
          ? selectedMovie.map((movie, index) => {
              return (
                <Chip
                  selectedMovie={movie}
                  setSelectedMovie={setSelectedMovie}
                  key={index}
                />
              );
            })
          : null}
      </div>
      <button
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          position: "fixed",
          bottom: "10px",
          right: "10px",
        }}
        onClick={handleNavigate}
      >
        Next Page
      </button>
    </div>
  );
}
