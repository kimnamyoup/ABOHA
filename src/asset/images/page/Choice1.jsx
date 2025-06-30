import React, { useState } from 'react'
import "../../css/Choice1.css"
import Sbutton from './../../component/Sbutton';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

const Choice1 = () => {
    const [q1, setQ1] = useState(null);
  const [q2, setQ2] = useState(null);
  const [q3, setQ3] = useState(null);

  return (
    <div className='select1'>
        <div className='progress_bar'>
            <div className='cur_bar'/>
        </div>
        <div className='quebox'>
        <h2 className='question'>당신의 성향을 알려주세요</h2>
         <p className='sub'>선택지를 보고 성향에 가까운 것을 선택 해주세요</p>
        </div>
        
        <div className='s_main'>
             <div className='queTop'>
         <p>Q1.평소 사람들과의 소통방식은 어떠하신가요?</p>
         <div className='btns'>
            <Sbutton
              onClick={() => 
              setQ1(prev=> prev === "outgo" ? null: "outgo")}
              active={q1 === 'outgo'}
          
            >외향적</Sbutton>
            <Sbutton
            onClick={() =>  setQ1(prev=> prev === "alone" ? null: "alone")}
              active={q1 === 'alone'}
             
            >내향적</Sbutton>
         </div>

        </div>
        <div className='quemid'>
         <p>Q2.평소 일정관리 방식은 어떠하신가요?</p>
         <div className='btns'>
            <Sbutton
            onClick={() => setQ2(prev=> prev ==='plan' ? null: "plan")}
              active={q2 === 'plan'}
            >계획적</Sbutton>
            <Sbutton 
             onClick={() => setQ2(prev=> prev ==='trans' ? null: "trans")}
              active={q2 === 'trans'}
             
            >즉흥적</Sbutton>
         </div>

        </div>
        <div className='quemid'>
         <p>Q3.평소 스트레스 해소방식은 어떠하신가요?</p>
         <div className='btns'>
            <Sbutton
                onClick={() => setQ3(prev=> prev ==='home' ? null: "home")}
              active={q3 === 'home'}
         
            
            >나혼자 휴식</Sbutton>
            <Sbutton
            onClick={() => setQ3(prev=> prev ==='friend' ? null: "friend")}
              active={q3 === 'friend'}
             
            >타인과 소통 및 만남</Sbutton>
         </div>

        </div>
        </div>
       <Link to="/Intro" className='next'>다음
       <FaArrowRight className='nb'/>
       </Link> 
       <div className='pogressdot'>
             <Link className='dot' to="/Choice1"></Link>   
             <Link className='dot' to="/Choice2"></Link>   
             <Link className='dot' to="/Choice3"></Link>   
             <Link className='dot' to="/Start"></Link>   
              
       </div>
    </div>
  )
}

export default Choice1