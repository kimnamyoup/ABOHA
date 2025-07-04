
import {  Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './App.css';


import Mainview from './asset/page/Mainview.jsx';
import Choice1 from './asset/page/Choice1.jsx';
import Start from './asset/page/Start.jsx';
import Choice2 from './asset/page/Choice2.jsx';
import Choice3 from './asset/page/Choice3.jsx';
import Login from './asset/page/Login.jsx';
import {  TransitionGroup, CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import FadeWrapper from './asset/Layout.jsx';
import MainPage from './asset/page/MainPage';
import Shop from './asset/page/Shop.jsx';
import { UserDataProvider } from './contexts.js';






function App() {

  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <UserDataProvider>
       
             <div className='phone'>
     <header className='stat'/>
     <TransitionGroup className="transition-group">
     <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}           
          timeout={0}
          classNames="fade"
          unmountOnExit                     
        >
          <FadeWrapper ref={nodeRef} className="transition-group">
            <Routes location={location}>
              <Route path="/"        element={<Mainview />} />
              <Route path="/login"   element={<Login />} />
              <Route path="/Choice1" element={<Choice1 />} />
              <Route path="/Choice2" element={<Choice2 />} />
              <Route path="/Choice3" element={<Choice3 />} />
              <Route path="/start"   element={<Start />} />
              <Route path="/MainPage" element={<MainPage/>} />
              <Route path="/shop"  element={<Shop/>} />
            </Routes>
          </FadeWrapper>
        </CSSTransition>
      </TransitionGroup>  
      <div className='botbar' />
    </div>
      
     
    
    
    </UserDataProvider>
    
    

  );
}

export default App;
