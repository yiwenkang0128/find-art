import React from "react"
import "./Footer.css"

const Footer = () => {
    return (
        <div className="footer">
            <div className="contents">
                <div className="item">
                    <h3>Recommended websites</h3>
                    <ul>
                        <li>Wikiart</li>
                        <li>Goole Art</li>
                        <li>The Metropolitan Museum of Art</li>
                    </ul>
                </div>
                <div className="item">
                    <h3>About</h3>
                    <ul>
                        <li>FAQ</li>
                        <li>Cookies</li>
                    </ul>
                </div>
                <div className="item">
                    <h3>Privacy</h3>
                    <span>
                        Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                        eiusmod tempor incididunt ut labore et.
                    </span>
                </div>
                <div className="item">
                    <h3>Contact</h3>
                    <span>
                        Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor.
                    </span>
                </div>
            </div>
            <div className="logo-area">
                <div className="footer-logo">Find Art</div>
                <div className="copyright">©Copyright 2024 All Rights Reserved</div>

            </div>
        </div>
    )
}

export default Footer