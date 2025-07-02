import React, { useState } from 'react'
import "../css/Choice1.css"
import Sbutton from '../component/Sbutton';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { useUserData } from '../../contexts';

const Choice1 = () => {
  const navigate = useNavigate();
  const {savePersonality} = useUserData();
  const question=[
    {
    key:"o1",
    text:'Q1.평소 사람들과의 소통방식은 어떠하신가요?',
    opts:[
      {value: 'outgo', label: '외향적 '},
      {value: 'alone', label: '내향적'},
    ]
  },
   {
    key:"o2",
    text:'Q2.평소 일정관리 방식은 어떠하신가요?',
    opts:[
      {value: 'paln', label: '계획적'},
      {value: 'trans', label: '즉흥적'},
    ]
  },
  {
    key:"o3",
    text:'Q3.평소 스트레스 해소방식은 어떠하신가요?',
    opts:[
      {value: 'alone', label: '나혼자 휴식'},
      {value: 'other', label: '타인과 소통 및 만남'},
    ]
  }
]

 const [answers,setAnswer]=useState(
  question.reduce((acc, q) => ({ ...acc, [q.key]: [] }), {})
 )

const toggleSelect=(qkey,val)=>{
  setAnswer(prev=>{
    const arr=prev[qkey];
    const has=arr.includes(val);
    return {
      ...prev,
        [qkey]: has
          ? arr.filter(x => x !== val)
          : [val]
      };
      
  })
}

const makeGrouped= ()=>{
  return question.map(q=>({
    key:q.key,
    select:q.opts
    .filter(opt=> answers[q.key].includes(opt.value))
    .map(opt=> ({value: opt.value, label:opt.label}))
  }));
}
const downJson=()=>{
  const grouped =makeGrouped();
  const json = JSON.stringify(grouped, null ,2);
  const blob = new Blob([json], {type:"application/json"});
  const herf =URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = herf;
  link.download = "grouped-answers.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(herf);

}


  const handleNext = (e) => {
    const groupedData= makeGrouped();

    savePersonality(groupedData);
   
    // downJson();

    navigate('/Choice2');
  };
  const dotRoutes = ['/choice1', '/choice2', '/choice3', '/start'];

  return (
    <div className='select1'>
        <div className='progress_bar'>
            <div className='cur_bar'/>
        </div>
        <div className='quebox'>
        <h2 className='question'>당신의 성향을 알려주세요</h2>
         <p className='sub'>선택지를 보고 성향에 가까운 것을 선택 해주세요</p>
        </div>
        
       <div className="s_main">
               {question.map(q => (
                 <div key={q.key} className="question-block">
                   <p className="quest">{q.text}</p>
                   <div className="btns">
                     {q.opts.map(opt => (
                       <Sbutton
                         key={opt.value}
                         active={answers[q.key].includes(opt.value)}
                         onClick={() =>{
                             toggleSelect(q.key, opt.value);
                             console.log(q.key, opt.value)
                         }}
                         
                       >
                         {opt.label}
                       </Sbutton>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
       <div className="next-wrapper">
              <button className="next-btn" onClick={handleNext}>
                다음 <FaArrowRight className='nb' />
              </button>
            </div> 
            
       <div className='pogressdot'>
             {dotRoutes.map((path, idx) => (
        <NavLink
          key={path}
          to={path}
          end                    
          className={({ isActive }) =>
            isActive ? 'dot active' : 'dot'
          }
        />
      ))}
       </div>
    </div>
  )
}

export default Choice1