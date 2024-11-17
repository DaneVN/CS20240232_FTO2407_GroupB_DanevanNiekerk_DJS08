//eslint-disable-next-line
import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Vans, { loader as vansLoader } from "../pages/Vans/Vans.jsx";
import VanDetail, {
  loader as vanDetailLoader,
} from "../pages/Vans/VanDetail.jsx";
import Dashboard, {
  loader as dashboardLoader,
} from "../pages/Host/Dashboard.jsx";
import Income from "../pages/Host/Income.jsx";
import Reviews from "../pages/Host/Reviews.jsx";
import HostVans, { loader as hostVansLoader } from "../pages/Host/HostVans.jsx";
import HostVanDetail, {
  loader as hostVansDetailLoader,
} from "../pages/Host/HostVanDetail.jsx";
import HostVanInfo from "../pages/Host/HostVanInfo.jsx";
import HostVanPricing from "../pages/Host/HostVanPricing.jsx";
import HostVanPhotos from "../pages/Host/HostVanPhotos.jsx";
import NotFound from "../pages/NotFound.jsx";
import Login, { action as loginAction } from "../pages/Login.jsx";
import Layout from "../components/Layout.jsx";
import HostLayout from "../components/HostLayout.jsx";
import Error from "../components/Error.jsx";
import AuthRequired from "../components/AuthRequired.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} action={loginAction} />
      <Route
        path="vans"
        element={<Vans />}
        errorElement={<Error />}
        loader={vansLoader}
      />
      <Route
        path="vans/:id"
        element={<VanDetail />}
        errorElement={<Error />}
        loader={vanDetailLoader}
      />

      <Route element={<AuthRequired />}>
        <Route path="host" element={<HostLayout />}>
          <Route
            index
            element={<Dashboard />}
            errorElement={<Error />}
            loader={dashboardLoader}
          />
          <Route path="income" element={<Income />} />
          <Route path="reviews" element={<Reviews />} />
          <Route
            path="vans"
            element={<HostVans />}
            errorElement={<Error />}
            loader={hostVansLoader}
          />
          <Route
            path="vans/:id"
            element={<HostVanDetail />}
            errorElement={<Error />}
            loader={hostVansDetailLoader}
          >
            <Route index element={<HostVanInfo />} />
            <Route path="pricing" element={<HostVanPricing />} />
            <Route path="photos" element={<HostVanPhotos />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
