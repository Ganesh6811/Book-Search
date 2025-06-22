import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuthStore from "./store/Auth.store.jsx";
import { useEffect } from "react";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import DisplayBook from "./pages/DisplayBookDetails.jsx";
import Books from "./pages/Books.page.jsx";
import AboutMe from "./pages/AboutMe.page.jsx";

function App() {
  const { isAuthenticated, isLoading, fetchUser } = useAuthStore();

  useEffect(() => {
    const getData = async () => {
      await fetchUser();
    }

    getData();
  }, [])

  if (isLoading) {
    return (<div className="w-screen h-screen bg-gradient-to-br from-black to-indigo-900 flex justify-center items-center">
      <div className="w-[300px] flex flex-col gap-20 justify-center items-center">


        <div className="flex gap-4 items-end">
          <div className="w-5 h-[120px] bg-[#f74cf7] rounded-full shadow-lg shadow-cyan-500/50 animate-bounce" style={{ animationDelay: `0s`, marginTop: '20px' }}></div>
          <div className="w-5 h-[140px] bg-[#f74cf7] rounded-full shadow-lg shadow-cyan-500/50 animate-bounce" style={{ animationDelay: `0.15s`, marginTop: '10px' }}></div>
          <div className="w-5 h-[120px] bg-[#f74cf7] rounded-full shadow-lg shadow-cyan-500/50 animate-bounce" style={{ animationDelay: `0.3s`, marginTop: '20px' }}></div>
          <div className="w-5 h-[140px] bg-[#f74cf7] rounded-full shadow-lg shadow-cyan-500/50 animate-bounce" style={{ animationDelay: `0.45s`, marginTop: '20px' }}></div>
          <div className="w-5 h-[140px] bg-[#f74cf7] rounded-full shadow-lg shadow-cyan-500/50 animate-bounce" style={{ animationDelay: `0.6s`, marginTop: '10px' }}></div>
          <div className="w-5 h-[120px] bg-[#f74cf7] rounded-full shadow-lg shadow-cyan-500/50 animate-bounce" style={{ animationDelay: `0.75s`, marginTop: '20px' }}></div>
        </div>


        <p className=" text-[#a193e2] text-4xl tracking-[0.4em] font-semibold opacity-80 animate-pulse">
          LOADING
        </p>
      </div>
    </div>)
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <HomePage /> : <LoginPage /> } />
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <HomePage />}/>
          <Route path="/signUp" element={!isAuthenticated ? <SignUpPage /> : <HomePage />}/>
          <Route path="/displayPage/:id" element={!isAuthenticated ? <LoginPage /> : <DisplayBook />}/>
          <Route path="/books/:searchData?" element={!isAuthenticated ? <LoginPage /> : <Books />}/>
          <Route path="/aboutMe" element={!isAuthenticated ? <LoginPage /> : <AboutMe />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
