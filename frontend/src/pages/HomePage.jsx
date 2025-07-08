import React, { useState } from 'react'
import { Navbar } from '../components/navbar'
import { RateLimitedUI } from '../components/RateLimitedUI';

const Homepage = () => {

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  const {isRateLimited, setIsRateLimited} = useState(false);

  return (
    <div className='min-h-screen'>
      <Navbar />
      {isRateLimited && <RateLimitedUI/>}
      <button onClick={() => setTheme("dark")} className="btn m-4"> Dark Mode </button>
      <button onClick={() => setTheme("light")} className="btn m-4">Light Mode</button>
    </div>
  )
}

export default Homepage
