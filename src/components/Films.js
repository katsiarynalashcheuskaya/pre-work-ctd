import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import s from "./Films.module.css";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";
import Preloader from "./common/Preloader/Preloader";

const Films = ({peopleData}) => {
    console.log('FilmsRendering')
    const [films, setFilms] = useState([]);

    const cardId = useLocation().pathname.slice(1);
    const specificCard = peopleData.find((person) => person.name === decodeURI(cardId));


    const getFilmsRequest = useCallback(async () => {
        console.log('getFilmsRequest rendering')
        let promises = [];
        let films = [];
        if (specificCard) {
            for (let film of specificCard.films) {
                promises.push(
                    await axios.get(film)
                        .then((response) => {
                            films.push(response.data)
                        })
                )
            }}

            Promise.all(promises)
                .then(() => setFilms(films))
                .catch((error) => {
                    alert("error loading data")})
    },[])

    useEffect(() => {
        void getFilmsRequest();
    }, [peopleData, getFilmsRequest]);

    return (
        <div className={s.filmsContainer}>
            {specificCard ?
                <div>
                    <div className={s.navContainer}>
                        <Link to={"/"} className={s.link}> <div className={s.linkName}>←</div> </Link>
                        <div className={s.containerLabel}><h3>{specificCard.name}</h3><h3> FILM LIST:</h3></div>
                    </div>
                                {specificCard.films.length > 0 ?
                                    films.map((film) => (
                                                <div key={film} className={s.filmsList}>
                                                    <div>
                                                        <span className={s.itemLabel}>Title: </span>
                                                        <span>{film.title} </span>
                                                    </div>
                                                    <div>
                                                        <span className={s.itemLabel}>Episodes: </span>
                                                        <span>{film.episode_id} </span>
                                                    </div>
                                                    <div>
                                                        <span className={s.itemLabel}>Director: </span>
                                                        <span>{film.director} </span>
                                                    </div>
                                                    <div>
                                                        <span className={s.itemLabel}>Producer: </span>
                                                        <span>{film.producer} </span>
                                                    </div>
                                                    <div>
                                                        <span className={s.itemLabel}>Release date: </span>
                                                        <span>{film.release_date} </span>
                                                    </div>
                                                    <div>
                                                        <span className={s.itemLabel}> About: </span>
                                                        <span>{film.opening_crawl} </span>
                                                    </div>
                                                </div>
                                    ))
                                    :
                                    <div>
                                        <span className={s.itemLabel}>Films: </span>
                                        <span>None</span>
                                    </div>
                                }
            </div>
                :
                <Preloader/>
            }


        </div>

    );
}

export default Films;