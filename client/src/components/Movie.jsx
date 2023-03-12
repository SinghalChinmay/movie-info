import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Movie({ q, tv_or_movie }) {

	let [isLoading, setIsLoading] = useState(false)
	let [data, setData] = useState("")

	const fetchData = async () => {
		try {
			let req = await axios.get(`http://localhost:8000?q=${q}&tv_or_movie=${tv_or_movie}`)
			let req_data = await req.data
			setData(req_data)
			setIsLoading(true)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		fetchData()
		}, [q, tv_or_movie])


	return (
		<div className="info-container">
			{
				isLoading == true
					&&
					(
						<div className='movie-info place-items-center flex flex-col border-2 items-center max-w-[800px] border-solid mx-auto my-4 border-gray-500 p-3 text-xl gap-4 rounded-xl justify-center text-center'>
							<img src={"https://image.tmdb.org/t/p/original" + data[0]['poster_path']} alt="Movie poster image" className='w-[650px] my-4 rounded-2xl h-[450px]'/>
							<h1 className='text-3xl font-bold'>{tv_or_movie == 'tv' ? (data[0]['name']) : (data[0]['title'])}</h1>
							<p className='text-left p-5'>{data[0]['overview']}</p>
							<div className="stats stats-vertical lg:stats-horizontal">
								<div className="stat">
									<div className="stat-title">Release Date</div>
									<div className="stat-value">{tv_or_movie == 'tv' ? (data[0]['first_air_date']) : (data[0]['release_date'])}</div>
								</div> 
								<div className="stat">
									<div className="stat-title">Status</div>
									<div className="stat-value">{data[0]['status']}</div>
								</div> 
								<div className="stat">
									<div className="stat-title">Original Language</div>
									<div className="stat-value">{data[1]['language']}</div>
								</div> 
							</div>
						</div>
				)
			}
		</div>
	)
}
