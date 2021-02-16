import React from 'react';
import './loader.css';

export default function Loader() {
    return (
        <div className="loader-wrapper d-none" id="loader-wrapper">
            <div class="loader-container">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
        </div>
    )
}
