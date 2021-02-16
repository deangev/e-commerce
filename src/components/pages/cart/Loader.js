import React from 'react';
import './loader.css';

export default function Loader() {
    return (
        <div className="loader-wrapper d-none" id="loader-wrapper">
            <div className="loader-container">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </div>
    )
}
