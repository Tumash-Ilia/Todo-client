import React from "react"
import './Footer.scss'


const Footer = () => {


  return (
      <footer className="page-footer blue">
          <div className="container">
              <div className="row">
                  <div className="col l6 s8">
                      <h5 className="white-text">Todo App</h5>
                      <p className="grey-text text-lighten-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet enim lorem. </p>
                  </div>
              </div>
          </div>
          <div className="footer-copyright blue">
              <div className="container">
                  © 2023 Copyright Text
              </div>
          </div>
      </footer>
  )
}

export default Footer