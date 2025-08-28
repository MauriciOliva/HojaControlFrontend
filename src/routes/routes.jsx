import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router"
import { SoporteFotografico } from '../pages/SoporteFotografico';
import FormatoControlVisita from "../pages/InformeControl";

const router = createBrowserRouter([
    {
        path: "/",
        element: <FormatoControlVisita />   
    },
    {
        path: "/fotografias",
        element: <SoporteFotografico />
    }
]);

const MyRoutes = ()=><RouterProvider router={router}/>

export default MyRoutes