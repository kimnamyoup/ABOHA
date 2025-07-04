import React, { useEffect, useState } from "react";
import "../css/Mainpage.css";
import { Link, NavLink } from 'react-router-dom';
import { FaCheck, FaPlus, FaSpinner } from "react-icons/fa";
import { useUserData } from "../../contexts";
import { type } from "@testing-library/user-event/dist/type";

const MainPage = () => {
  const { 
    missions, 
    loading, 
    generateMissions, 
    refreshUncompletedMissions, 
    userData,
    completedMissions,  
    setCompletedMissions, 
    refreshCount,      
    setRefreshCount       
  } = useUserData();
 
  const MAX_REFRESH_COUNT = 3;
  

  useEffect(() => {
    if (missions.length === 0) {
      generateMissions();
    }
  }, [generateMissions, missions.length]);


  // useEffect 수정
    useEffect(() => {

    if (
      (userData.personality.length > 0 || userData.hobbies.length > 0 || userData.values.length > 0) &&
      missions.length === 0
    ) {
      generateMissions();
    }
  }, [userData, generateMissions,missions.length]);





  const community = [
    {
      key: "c1", thumb: require("../images/th1.png"), opts: [
        { value: "c1", label: "커뮤니티1" }
      ]
    },
    {
      key: "c2", thumb: require("../images/th2.png"), opts: [
        { value: "c2", label: "커뮤니티1" }
      ]
    },
    {
      key: "c3", thumb: require("../images/th3.png"), opts: [
        { value: "c3", label: "커뮤니티1" }
      ]
    },
    {
      key: "c4", thumb: require("../images/th4.png"), opts: [
        { value: "c4", label: "커뮤니티1" }
      ]
    },
  ]



  const navi = [
    {
      key: "n1", thumb: require("../images/comunity.png"), opts: [
        { value: "n1", label: "커뮤니티", path: "/cmt" }
      ]
    },
    {
      key: "n2", thumb: require("../images/cart.png"), opts: [
        { value: "n2", label: "포인트샵", path: "/shop" }
      ]
    },
    {
      key: "n3", thumb: require("../images/home.png"), opts: [
        { value: "n3", label: "HOME", path: "/Mainpage" }
      ]
    },
    {
      key: "n4", thumb: require("../images/info.png"), opts: [
        { value: "n4", label: "마이페이지", path: "/Mypage" }
      ]
    },
    {
      key: "n5", thumb: require("../images/setting.png"), opts: [
        { value: "n5", label: "환경설정", path: "/Set" }
      ]
    },
  ]

  const [select, setSelect] = useState(
    community.reduce((acc, q) => ({ ...acc, [q.key]: [] }), {})
  )



  const [Navi, setNavi] = useState(
    navi.reduce((acc, item) => ({ ...acc, [item.key]: [] }), {})
  )

 

  const handleMissionClick = (missionId) => {
    setCompletedMissions(prev =>
      prev.includes(missionId)
        ? prev.filter(id => id !== missionId) 
        : [...prev, missionId] 
    );
  };

  const handleRefreshMissions = () => {
    if (!loading && refreshCount < MAX_REFRESH_COUNT) { 
      refreshUncompletedMissions();
      setRefreshCount(prev => prev + 1);
    }
  };


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
                    {missions.length > 0 ? (
                        missions.map(m => (
                            <button
                                key={m.id}
                                className={`dm_mission ${completedMissions.includes(m.id) ? 'completed' : ''}`}
                                onClick={() => handleMissionClick(m.id)}
                            >
                                {m.title}
                            </button>
                        ))

                    ) : (
                        <p className="no_mission">미션이 없습니다.</p>
                    )}


          {/* ② 새로고침 버튼 */}
          <button
            className="dmies"
             disabled={loading || completedMissions.length > 2 || refreshCount >=3} 
            onClick={handleRefreshMissions}
          >
            
            {loading ? (
              <FaSpinner className="spin" />
            ) : (
              <FaCheck />
            )}
          </button>
          <span className='refresh-count'>({refreshCount}/{MAX_REFRESH_COUNT})</span>
        </div>

        <div className="cummunity">
          {community.map(q => (
            <div key={q.key} className="com_block">
              <div className="cbtns">
                <img className="thumb" src={q.thumb} alt="t1" />
                {q.opts.map(opt => (
                  <NavLink
                     className={({ isActive }) => `thumb_comu ${isActive ? 'active' : ''}`}
                    key={opt.value}
                  >
                    {opt.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pre_ad">
          <p className="ad_tit">Plus Membership</p>
          <p className="con_txt">다양한 미션 확장 및 횟수 제한 해제</p>
          <p className="con_txt">광고제거</p>
          <p className="con_txt">포인트 적립 추가</p>
        </div>
      </div>
      <div className="navi_bar">
        {navi.map(n => (
          <div key={n.key} className="navi_item">

            {n.opts.map(opt => (
              <NavLink
                to={opt.path}
                key={opt.value}
                className={({ isActive }) => `thumb_comu ${isActive ? 'active' : ''}`}
                onClick={() => {
                }}
              >
                <img className="thumb2" src={n.thumb} alt="navigation" />
                {opt.label}
              </NavLink>
            ))}
          </div>
        ))}

      </div>
    </div>
  );
};

export default MainPage;
