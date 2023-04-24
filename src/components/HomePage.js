import React from 'react';
import s from './HomePage.module.css'
import {Link} from "react-router-dom";
import Preloader from "./common/Preloader/Preloader";

const HomePage = ({peopleData}) => {
    return (
        <div className={s.peopleContainer}>
            {!peopleData ? <Preloader/>
                : peopleData.map((person, index) =>
                <div className={s.peopleList} key={index}>
                    <div>
                        <div>
                        <span className={s.itemLabel}>Name: </span>
                        <span>{person.name} </span>
                        </div>
                        <div>
                            <span className={s.itemLabel}>Year of birth: </span>
                            <span>{person.birth_year} </span>
                        </div>
                        <div>
                            <span className={s.itemLabel}>Gender: </span>
                            <span>{person.gender} </span>
                        </div>
                        <div>
                            <span className={s.itemLabel}>Home world: </span>
                            <span>{person.homeworld}</span>
                        </div>
                        <div>
                            <span className={s.itemLabel}>Species: </span>
                            <span>{person.species}</span>
                        </div>
                        <Link to={`/${person.name}`} className={s.link}>
                            <br/>
                            <div className={s.linkName}>SHOW FILMS</div>
                        </Link>
                    </div>


                </div>
            )
            }

        </div>


    );
};

export default HomePage;
