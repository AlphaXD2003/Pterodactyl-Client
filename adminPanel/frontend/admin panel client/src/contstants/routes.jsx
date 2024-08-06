import { Layout } from "../layout"
import semiRoutes from "./semiRoutes"
import { Login, NotFoundPage as NotFound } from "../pages/index"
import Protected from "../protected/Protected"
const routes = [
    {
        path: '*',
        element: <NotFound />
    },
    {
        path: "/",
        element : <Layout/>,
        children: semiRoutes
    },
    {
        path:'/admin/login',
        element: <Login/>
    }
]

export default routes;