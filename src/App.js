import {useEffect, useState} from "react";
import './App.css';
import starWarsLogo from "../src/assets/star-wars-logo.svg"
import axios from 'axios';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import Films from "./components/Films";

function App() {
    const [peopleData, setPeopleData] = useState([])

    const getPeopleRequest = async () => {
        await axios.get("https://swapi.dev/api/people")
            .then((response) => {
                let peopleCopy = response.data.results;
                let promises = [];
                for (let person of peopleCopy) {
                    promises.push(
                        axios.get(person.homeworld)
                            .then((response) => {
                                person.homeworld = response.data.name
                            }),

                        person.species.length > 0 ?
                            axios.get(person.species[0])
                                .then((response) => {
                                    person.species = response.data.name
                                })

                            : person.species = "Human"
                    )
                }

                Promise.all(promises)
                    .then(() => {
                        setPeopleData(peopleCopy)
                    })
                    .catch((error) => {
                        alert("error loading data")
                    })

            })
    }

    useEffect(() => {
        void getPeopleRequest();
    }, []);

    return (
        <Router>
            <div className="app-container">
                <div className="app-wrapper">
                    <img src={starWarsLogo} alt='logo' className='logo'/>
                    <Routes>
                        <Route path="/" element={<HomePage peopleData={peopleData}/>}/>
                        <Route path="/:id" element={<Films peopleData={peopleData}/>}/>
                    </Routes>
                    </div>
                </div>
        </Router>
    );
}

export default App;
