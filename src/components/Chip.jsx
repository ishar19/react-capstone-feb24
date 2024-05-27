/* eslint-disable react/prop-types */
export default function Chip({ selectedMovie, setSelectedMovie }) {
  function removeSelection() {
    setSelectedMovie((prev) => prev.filter((item) => item !== selectedMovie)); // same thing from boxes
  }
  return (
    <span
      style={{
        border: "1px solid black",
        padding: "5px",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {selectedMovie}&nbsp; &nbsp;{" "}
      <span
        style={{
          cursor: "pointer",
        }}
        onClick={removeSelection}
      >
        X
      </span>
    </span>
  );
}
