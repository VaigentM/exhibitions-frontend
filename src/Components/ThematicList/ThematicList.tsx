import "./ThematicList.sass"
import SearchBar from "../SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import ThematicCard from "./ThematicCard/ThematicCard";
import {iThematicsMock, requestTime} from "../../Consts";
import {Thematic} from "../../Types";

const ThematicList = () => {

    const [thematics, setThematics] = useState<Thematic[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchThematics = async () => {

        try {

            const response = await fetch(`http://127.0.0.1:8000/api/thematics/search?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const thematics = raw["thematics"]

            setThematics(thematics)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setThematics(iThematicsMock.filter(thematic => thematic.name.toLowerCase().includes(query)))

    }

    useEffect(() => {
        searchThematics()
    }, [])

    const cards = thematics.map(thematic  => (
        <ThematicCard thematic={thematic} key={thematic.id} isMock={isMock}/>
    ))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await searchThematics()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={handleSubmit}>

                <h2>Поиск тематик</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </form>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default ThematicList;