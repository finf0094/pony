import {createBrowserRouter, RouterProvider} from "react-router-dom";

/* PAGES */
import {PonyPage} from "@/pages/Pony.page";
import {NotFoundPage} from "@/pages/NotFound.page.tsx";

/* ROUTES */
import {getRouteMain} from "@/shared/routes";

const router = createBrowserRouter([
    {
        path: getRouteMain(),
        element: <PonyPage/>,
        errorElement: <NotFoundPage/>
    }
]);

export function Router() {
    return <RouterProvider router={router}/>;
}
