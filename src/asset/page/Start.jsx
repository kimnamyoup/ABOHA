import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../css/Start.css"
import MainPage from './MainPage';

const Start = () => {
  const navigate = useNavigate();
   const dotRoutes = ["/choice1", "/choice2", "/choice3", "/start"];

   const handstart=()=>{
    navigate("/MainPage")
   }
  return (
    <div className='Start'>


    <div className="st_main">
      <div className='Check'>
    </div>
    <div className='stxt_bx'>
          <h2 className='done'>성향분석완료!</h2>
          <p>AI가 당신의 성향을 분석 해 맞춤형 미션을 제공합니다.</p>
    </div>
    <button className="start_btn" onClick={handstart}>시작하기</button>
    </div>
    

  <div className="pogressdot">
        {dotRoutes.map((path, idx) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) => (isActive ? "dot active" : "dot")}
          />
        ))}
      </div>

    </div>
  )
}

export default Start