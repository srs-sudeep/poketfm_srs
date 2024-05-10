import React from 'react'

const Footer = () => {
  return (
    <footer className="footer absolute bottom-0 footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">Home</a>
        <a className="link link-hover">Video</a>
        <a className="link link-hover">Audio</a>
      </nav>
      <aside>
        <p>Copyright © 2024 - All right reserved by Sudeep Ranjan Sahoo</p>
      </aside>
    </footer>
  )
}

export default Footer
