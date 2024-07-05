import { createBrowserRouter } from "react-router-dom";
import { Home } from './pages/home';
import { Layout } from './components/layout';
import { Login } from "./pages/login";
import { Private } from "./routes/private";
import { Opportunity } from "./pages/opportunity";
import { Leads } from "./pages/leads";
import { ErrorBoundary } from "./pages/error";
import { Gestoria } from "./pages/gestoria/gestoria";
import { NotFound } from "./pages/notFound";
import { LayoutGestoria } from "./components/gestoria/layoutGestoria";
//import { Gestor } from "./routes/gestor";

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
        element: <Private><ErrorBoundary/></Private>,
        path: "iohfpio",
      },
      {
        path: "*",
        element: <Private><NotFound/></Private>
      }
    ]
  },
  {
    element: <Login/>,
    path: "/login"
  },
  {
  element: <LayoutGestoria/>,
  children: [
    {
      path: "/gestoria",
      element: <Private><Gestoria/></Private>
    }
  ]
  }
  
])





export { router } ;