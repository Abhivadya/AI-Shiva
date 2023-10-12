import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Home, CreatePost } from './pages';
import {logo} from './assets';

const App = () => {
  return (
    <React.Fragment>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-2 border-b border-b-[#e6ebf4]'>
        <Link to="/">
          <img  src={logo} alt='logo' className='w-28 object-contain'/>
        </Link>
        <Link to='/create-post' className='font-inter font-medium text-white bg-purple-800 rounded-md px-4 py-1'>
          Create
        </Link>
      </header>
      <main className='w-full sm:p-4 px-4 py-4 bg-[#f9fafe] min-h-[calc(100vh-70px)]'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/create-post' element={<CreatePost/>} />
        </Routes>
      </main>
    </React.Fragment>
  )
}

export default App