import React, { useEffect, useState } from "react";
import axios from "axios";

function Genre({ name }) {
  return <div className="badge badge-primary">{name}</div>;
}

function Genres({ genres }) {
  const genreList = genres.map((genre) => (
    <Genre key={genre["id"]} name={genre["name"]} />
  ));
  return <div className="flex gap-3">{genreList}</div>;
}

function Stat({ title, value }) {
  return (
    <div className="stat">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

export default function Movie({ q, tv_or_movie }) {
  let [isLoading, setIsLoading] = useState(false);
  let [data, setData] = useState("");

  const fetchData = async () => {
    try {
      let req = await axios.get(
        `http://localhost:8000?q=${q}&tv_or_movie=${tv_or_movie}`
      );
      let req_data = await req.data;
      setData(req_data);
      setIsLoading(true);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [q, tv_or_movie]);

  return (
    <div className="info-container">
      {isLoading == true && (
        <div className="movie-info place-items-center flex flex-col border-2 items-center max-w-[800px] border-solid mx-auto my-4 border-gray-500 p-3 text-xl gap-4 rounded-xl justify-center text-center">
          <img
            src={"https://image.tmdb.org/t/p/original" + data[0]["poster_path"]}
            alt="Movie poster image"
            className="w-[650px] my-4 rounded-2xl h-[450px]"
          />
          <h1 className="text-3xl font-bold">
            {tv_or_movie == "tv" ? data[0]["name"] : data[0]["title"]}
          </h1>
          <Genres genres={data[0]["genres"]} />
          <p className="text-left p-5">{data[0]["overview"]}</p>
          <div className="stats stats-vertical lg:stats-horizontal">
            <Stat
              title={"Release Date"}
              value={
                tv_or_movie == "tv"
                  ? data[0]["first_air_date"]
                  : data[0]["release_date"]
              }
            />
            <Stat title={"Status"} value={data[0]["status"]} />
            <Stat title={"Original Language"} value={data[1]["language"]} />
          </div>
          <div className="stats stats-vertical lg:stats-horizontal">
            <Stat title={"Popularity"} value={data[0]["popularity"]} />
            <Stat title={"Vote Average"} value={data[0]["vote_average"]} />
            <Stat
              title={tv_or_movie == "tv" ? "Total Seasons" : "Runtime"}
              value={
                tv_or_movie == "tv"
                  ? data[0]["number_of_seasons"]
                  : `${(data[0]["runtime"] / 60).toFixed(1)} hrs`
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
