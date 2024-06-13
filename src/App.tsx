import { createBrowserRouter } from "react-router-dom";
import { Home } from './pages/home';
import { Layout } from './components/layout';
import { Login } from "./pages/login";
import { Private } from "./routes/private";
import { Opportunity } from "./pages/opportunity";
import { Leads } from "./pages/leads";
import { ErrorBoundary } from "./pages/error";
import { Gestoria } from "./pages/gestoria";
import { NotFound } from "./pages/notFound";
const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Private><Home/></Private>
      },
      {
        path: "/opportunity/:id",
        element: <Private><Opportunity/></Private>
      },
      {
        path: "/leads/:id",
        element: <Private><Leads/></Private>
      },
      {
        element: <ErrorBoundary/>,
        path: "iohfpio",
      },
      {
        element: <Gestoria/>,
        path: "/gestoria"
      },
      {
        path: "*",
        element: <NotFound/>
      }
    ]
  },
  {
    element: <Login/>,
    path: "/login"
  }
])





export { router } ;