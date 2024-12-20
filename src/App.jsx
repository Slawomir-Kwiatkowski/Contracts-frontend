import {createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import MainPage from "./pages/MainPage"
import ErrorPage from "./pages/ErrorPage"
import LoginPage from "./pages/LoginPage"
import LogoutPage from "./pages/LogoutPage"
import RegisterPage from "./pages/RegisterPage"
import WarehousesPage from "./pages/WarehousesPage"
import WarehousePage from "./pages/WarehousePage"
import { warehouseLoader } from "./components/Warehouse"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<MainPage/>} />
      <Route path="/login/" element={<LoginPage/>} />
      <Route path="/logout" element={<LogoutPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/warehouses" element={<WarehousesPage/>} />
      <Route path="/warehouses" element={<WarehousesPage/>} />
      <Route path="/warehouses/:id" element={<WarehousePage/>} loader={warehouseLoader} />
      <Route path="*" element={<ErrorPage/>} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} /> 
  )
}

export default App
