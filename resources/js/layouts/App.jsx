import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CountryIndex from "../components/CountryIndex";
import CountryCreate from "../components/CountryCreate";
import CountryEdit from "../components/CountryEdit";
import StateIndex from "../components/StateIndex";
import StateCreate from "../components/StateCreate";
import StateEdit from "../components/StateEdit";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CountryIndex />} />
                    <Route path="/country/create" element={<CountryCreate />} />
                    <Route path="/country/edit/:id" element={<CountryEdit />} />
                    <Route path="/country/:id/states" element={<StateIndex />} />
                    <Route path="/state/add/:id" element={<StateCreate />} />
                    <Route path="/state/edit/:id" element={<StateEdit />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App