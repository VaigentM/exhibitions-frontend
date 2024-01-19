import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import ThematicPage from "./pages/ThematicPage/ThematicPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import ExhibitionConstructor from "./components/ExhibitionConstructor/ExhibitionConstructor";
import ExhibitionPage from "./pages/ExhibitionPage/ExhibitionPage";
import ExhibitionsPage from "./pages/ExhibitionsPage/ExhibitionsPage";
import ThematicEditPage from "./pages/ThematicEditPage/ThematicEditPage";
import ThematicAddPage from "./pages/ThematicAddPage/ThematicAddPage";
import ThematicsList from "./pages/ThematicsPage/ThematicsList/ThematicsList";
import ThematicsTable from "./pages/ThematicsPage/ThematicsTableWrapper/ThematicsTable/ThematicsTable";
import ThematicsTableWrapper from "./pages/ThematicsPage/ThematicsTableWrapper/ThematicsTableWrapper";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && !is_moderator && location.pathname.endsWith("thematics-list") && <ExhibitionConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/bmstu">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/thematics-list" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/thematics-list" element={<ThematicsList />} />

                                    <Route path="/thematics-table" element={<ThematicsTableWrapper />} />

                                    <Route path="/thematics/add" element={<ThematicAddPage />} />

                                    <Route path="/thematics/:id" element={<ThematicPage />} />

                                    <Route path="/thematics/:id/edit" element={<ThematicEditPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/exhibitions/:id" element={<ExhibitionPage />} />

                                    <Route path="/exhibitions" element={<ExhibitionsPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
