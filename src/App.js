
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Mainview from './asset/images/page/Mainview.jsx';
import Choice1 from './asset/images/page/Choice1';
import Start from './asset/images/page/Start.jsx';
import Choice2 from './asset/images/page/Choice2.jsx';
import Choice3 from './asset/images/page/Choice3.jsx';




function App() {


  return (
    <div className='phone'>
     <header className='stat'/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mainview></Mainview>}/>
        <Route path='/Choice1' element={<Choice1></Choice1>}/>
        <Route path='/Choice2' element={<Choice2></Choice2>}/>
        <Route path='/Choice3' element={<Choice3></Choice3>}/>
        <Route path='/Start' element={<Start></Start>}/>
      </Routes>
    </BrowserRouter>
      <div className='botbar' />
    </div>
    

  );
}

export default App;
