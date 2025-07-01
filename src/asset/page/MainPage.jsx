import React from "react";
import "../css/Mainpage.css";
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";

const MainPage = () => {
  return (
    <div className="Mp">
      <h2 className="nickt">혼자서도 잘하는 "폴리텍" 님</h2>
      <div className="m_progress">
        <div className="mpt_1">
          <p className="dpt">일일 미션진행율</p>
          <div className="mp_bar">
            <div className="mp_cur"></div>
          </div>
          <p className="percent">50%</p>
        </div>
        <div className="mpt_1">
          <p className="dpt">주간 미션진행율</p>
          <div className="mp_bar">
            <div className="mp_cur2"></div>
            <p className="percent">15%</p>
          </div>
        </div>
        
      </div>
      <div className="point">
        <p>완료 포인트</p>
        <p>2000p</p>
      </div>
      <div className="Main_img">
      </div>
      <div className="Main_info">
        <div className="main_info_dm">
          <div className="dm_tit">일일 미션 <FaPlus /></div>
            <Link className="dm_mission">미션 1</Link>
            <Link className="dm_mission">미션 2</Link>
        </div>
        <div className="cummunity">
                
        </div>
      </div>
      <div className="navi_bar"></div>
    </div>
  );
};

export default MainPage;
