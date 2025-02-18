import {createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import MainPage from "./pages/MainPage"
import ErrorPage from "./pages/ErrorPage"
import LoginPage from "./pages/LoginPage"
import LogoutPage from "./pages/LogoutPage"
import RegisterPage from "./pages/RegisterPage"
import WarehousesPage from "./pages/WarehousesPage"
import WarehousePage from "./pages/WarehousePage"
import WarehouseAddPage from "./pages/WarehouseAddPage"
import WarehouseEditPage from "./pages/WarehouseEditPage"
import ContractsPage from "./pages/ContractsPage"
import { warehouseLoader } from "./components/Warehouse"
import { warehousesLoader } from "./components/Warehouses"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<MainPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/logout" element={<LogoutPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/warehouses" element={<WarehousesPage/>} loader={warehousesLoader} />
      <Route path="/warehouses/:id" element={<WarehousePage/>} loader={warehouseLoader} />
      <Route path="/add-warehouse" element={<WarehouseAddPage/>} />
      <Route path="/edit-warehouse/:id" element={<WarehouseEditPage/>} loader={warehouseLoader} />
      <Route path="/contracts" element={<ContractsPage/>} />

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
