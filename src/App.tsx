import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import {useState} from "react";
import Header from "./Components/Header/Header";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import ThematicList from "./Components/ThematicList/ThematicList";
import ThematicPage from "./Components/ThematicPage/ThematicPage";
import {Thematic} from "./Types";

function App() {

    const [selectedThematic, setSelectedThematic] = useState<Thematic | undefined>(undefined)

    return (
        <div className="App">

            <div className="wrapper">

                <Header />

                <div className={"content-wrapper"}>

                    <BrowserRouter basename="/exhibitions">

                        <Breadcrumbs selectedThematic={selectedThematic} setSelectedThematic={setSelectedThematic}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/thematics" replace />} />

                            <Route path="/thematics" element={<ThematicList />} />

                            <Route path="/thematics/:id" element={<ThematicPage selectedThematic={selectedThematic} setSelectedThematic={setSelectedThematic} />} />

                        </Routes>

                    </BrowserRouter>

                </div>

            </div>

        </div>
    )
}

export default App
