import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/login_page"
import DashboardPage from "./pages/dashboard"
import ClientsPage from './pages/client/clients'
import ClientFormPage from './pages/client/newclient'

function App() {

    return (

        <BrowserRouter>
          <Routes>
               <Route path="/login" element={<LoginPage/>}/>
               <Route path="/dashboard" element={<DashboardPage/>}/>
               <Route path="/clients" element={<ClientsPage />} />
               <Route path="/clients/nouveau" element={<ClientFormPage />}/>
               <Route path="/clients/:clientId/modifier" element={<ClientFormPage />}
/>

               <Route path="/" element={<Navigate to="/login" replace/>}/>
               <Route path="*" element={<Navigate to="/login" replace/>}/>
          </Routes>

        </BrowserRouter>
    )
}

export default App