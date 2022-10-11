import { Navigate } from "react-router-dom";

import { PathName } from "@/ui/utilities/paths";
import { Editor, HelloWorld, NotFound } from "../sections";
import { MainLayout } from "./MainLayout";

const routes = () => [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: PathName.HOME,
                element: <HelloWorld name="copain" />,
            },
            {
                path: PathName.PAGES,
                element: <Editor />,
            },
            {
                path: "404",
                element: <NotFound />,
            },
            {
                path: "*",
                element: <Navigate to="404" />,
            },
        ],
    },
    {
    // TODO: redirect default path on startup
        path: "index.html",
        element: <Navigate to="/" />,
    },
];

export default routes;
