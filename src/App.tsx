import Home from "./containers/Home/Home.tsx";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout.tsx";
import AddNewDish from "./containers/AddNewDish/AddNewDish.tsx";
import Orders from "./containers/Orders/Orders.tsx";


const App = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={    <Home/>} />
                    <Route path="/admin" element={    <Home/>} />
                    <Route path="/new-dish" element={    <AddNewDish/>} />
                    <Route path="/edit-dish/:id" element={    <AddNewDish/>} />
                    <Route path="/orders" element={    <Orders/>} />
                    <Route path="*" element={<h1>Not found</h1>} />
                </Routes>
            </Layout>
        </>
    )
};

export default App;