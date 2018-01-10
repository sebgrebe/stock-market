import React from 'react'

const Footer = () => (
    <div className="footer">
        <p>
            Created by <a className="footer_a" href="https://sebgrebe.github.io/">sebgrebe</a> with
            <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                <img src="/images/reactlogo.png" className="logo" alt="ReactJS" />
            </a> and
            <a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">
                <img src="/images/nodejs_logo.png" className="logo" alt="NodeJS"/>
            </a>
        </p>
        <p>
            Source code on <a href="https://github.com/sebgrebe/stock-market" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-github" aria-hidden="true"></i>
        </a>
        </p>
    </div>
)

export default Footer