import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo, genAirtify} from "./assets";

import { Home, CreatePost } from './pages';

const App = () => {
  return (
    <BrowserRouter>
    <header className='w-full flex justify-between items-center sm:px-8 px-4 py-4 border-b border-b-[#4b5563] bg-gradient-to-r from-indigo-500'>
      <div className='flex items-center gap-3'>
        <Link to="/">
          <img src={genAirtify} alt="logo" className="mt-1 w-29 object-contain" />
        </Link>
        <div className='flex items-center gap-1'>
          <p className=" text-[#27272a] text-[16px] max-w-[500px] cursor-default"> powered by </p>
          <img src={logo} alt="logo" className="w-28 object-contain"/>
        </div>
      </div>
      <div>
        <a href="/create-post" className="relative inline-block text-lg group">
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative">Create</span>
          </span>
          <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
        </a>
      </div>
    </header>

    <main className="w-full bg-gradient-to-r from-indigo-500 min-h-[calc(100vh-73px)] mx-auto">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/create-post" element={<CreatePost />}/>
      </Routes>

    </main>
    </BrowserRouter>
  )
}

export default App
