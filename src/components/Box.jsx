/* eslint-disable react/prop-types */
export default function Box({ data, selectedMovie, setSelectedMovie }) {
  function handleSelection() {
    if (selectedMovie.includes(data.category)) {
      // if this movie is already selected
      setSelectedMovie((prev) => prev.filter((item) => item !== data.category)); // then filter it out and remove from the selected movies array
    } else {
      // if this movie is not selected
      setSelectedMovie((prev) => [...prev, data.category]); // add it into the state
    }
  }
  return (
    <div
      style={{
        border: `10px solid ${
          selectedMovie.includes(data.category) ? "green" : "black"
        }`,
        padding: "10px",
        margin: "10px",
        width: "100px",
        height: "100px",
        display: "inline-block",
      }}
      onClick={handleSelection}
    >
      {data.category}
    </div>
  );
}
