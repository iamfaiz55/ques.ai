import { Toaster } from "sonner" // ✅ Import

import { BrowserRouter, Route, Routes } from "react-router"


import Login from "./pages/authentication/Login"
import Layout from "./Components/Layout"
import FirstLayout from "./Components/FirstLayout"
import Project from "./pages/user/Project"
import Register from "./pages/authentication/Register"
import { ProjectProvider } from "./contexts/ProjectContext"
import Podcast from "./pages/user/Podcast"
import Transcript from "./pages/user/Transcript"
import Protect from "./Components/Protected"
import Account from "./pages/user/Account"


const App = () => {
  return (
    <div className="">
       <ProjectProvider>
      <BrowserRouter>
      <Toaster position="top-right" richColors />



      <Routes>
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Protect compo={<FirstLayout/>}/>}>
           <Route index element={<Project/>}/>
        </Route>
        </Routes>
        <Routes>
        <Route path="/project" element={<Protect compo={<Layout/>}/>}>
         <Route path="account" element={<Account/>}/>
           <Route index element={<Podcast/>}/>
           <Route path="transcript" element={<Transcript/>}/>
        </Route>
      </Routes>
    

      </BrowserRouter>
      </ProjectProvider>
    </div>
  )
}

export default App
