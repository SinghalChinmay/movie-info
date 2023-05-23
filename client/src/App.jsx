import { useRef, useState } from "react";
import Movie from "./Movie";
import "./App.css";

function App() {
  const [movie, setMovie] = useState("");
  const [showType, setType] = useState("movie");
  const [tv_movie, setTVMovie] = useState("movie");
  const onOptionChange = (e) => {
    setType(e.target.id);
  };
  let movieName = useRef();

  return (
    <div className="App">
      <div className="query">
        <div className="search flex flex-row gap-3 justify-center m-3 p-7">
          <input
            onKeyDownCapture={(e) => {
              if (e.key == "Enter") {
                setMovie(movieName.current.value);
                setTVMovie(showType);
              }
            }}
            type="text"
            ref={movieName}
            placeholder="Enter Movie Name"
            className="input w-[450px] bg-slate-400 text-black text-lg placeholder:text-black placeholder:text-base"
          />
          <button
            onClick={() => {
              setMovie(movieName.current.value);
              setTVMovie(showType);
            }}
            className="fa fa-search btn btn-tertiary"
          ></button>
        </div>
        <div className="text-2xl align-items-center radio-btn flex flex-row items-center justify-evenly">
          <div className="movie flex gap-4 items-center">
            <input
              onChange={onOptionChange}
              className="radio radio-warning"
              type="radio"
              name="tv_or_movie"
              defaultChecked
              id="movie"
            />
            <label htmlFor="movie" className="label cursor-pointer">
              Movie
            </label>{" "}
            <br />
          </div>
          <div className="tv flex gap-4 items-center">
            <input
              onChange={onOptionChange}
              className="radio radio-warning"
              type="radio"
              name="tv_or_movie"
              id="tv"
            />
            <label htmlFor="tv" className="label cursor-pointer">
              TV Show
            </label>{" "}
            <br />
          </div>
        </div>
      </div>
      {movie != "" && <Movie q={movie} tv_or_movie={tv_movie} />}
    </div>
  );
}

export default App;
