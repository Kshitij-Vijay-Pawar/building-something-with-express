import React from 'react'

const Footer = () => {
    const setTheme = (theme) => {
        document.documentElement.setAttribute("data-theme", theme);
    };

    return (

    

    <div>
      <button onClick={() => setTheme("dark")} className="btn m-4"> Dark Mode </button>
      <button onClick={() => setTheme("light")} className="btn m-4">Light Mode</button>
      
    </div>
  )
}

export default Footer
