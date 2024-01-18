import "./ThematicPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iThematicsMock, requestTime} from "../../Consts";
import {Thematic} from "../../Types";
import mockImage from "/src/assets/mock.png"

const ThematicPage = ({ selectedThematic, setSelectedThematic }: { selectedThematic:Thematic | undefined, setSelectedThematic: Dispatch<Thematic| undefined>}) => {

    const { id } = useParams<{id: string}>();

    if (id == undefined){
        return;
    }

    const [isMock, setIsMock] = useState<boolean>(false);

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/thematics/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const thematic: Thematic = await response.json()

            setSelectedThematic(thematic)

            setIsMock(false)
        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedThematic(iThematicsMock.find((thematic:Thematic) => thematic?.id == parseInt(id)))
        setIsMock(true)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const img = `http://127.0.0.1:8000/api/thematics/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img} />

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{selectedThematic?.name}</h2>

                    <br />

                    <span>{selectedThematic?.description}</span>

                </div>

            </div>

        </div>
    )
}

export default ThematicPage;