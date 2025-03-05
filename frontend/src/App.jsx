import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/sendMoney" element={<SendMoney/>}/>
        </Routes>
      </BrowserRouter>    
    </>
  )
}

export default App
