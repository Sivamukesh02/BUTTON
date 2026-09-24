import React,  { useEffect, useState } from 'react';
import AOS from 'aos';
import Proj from './Components/Proj';
import { HashRouter,Routes,Route } from 'react-router-dom';

function App(){
        useEffect(() => {
        // Initializing AOS components animation parameters controls parameters dynamically to prevent layer hides overrides triggers limits setups rules
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    return(
        <HashRouter>
            <Routes>
                <Route path="/" element={<Proj/>}/>
            </Routes>
        </HashRouter>
    );
}
export default App;