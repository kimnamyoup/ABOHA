import React, { useState } from 'react'
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom'
import "../css/choice2.css"
import Sbutton from '../component/Sbutton'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const Choice2 = () => {
  const navigate = useNavigate();
  const question=[
    {
    key:"t1",
    text:'ENTERTAINMENT & MEDIA',
    opts:[
      {value: 'Movie', label: '영화·드라마 시청'},
      {value: 'Netflix', label: '유튜브·넷플릭스'},
      {value: 'music', label: '음악 감상'},
      {value: 'Webtoon', label: '웹툰·만화'},
      {value: 'Game', label: '게임'}
    ]
  },
   {
    key:"t2",
    text:'ITNESS & SPORTS',
    opts:[
      {value: 'fit', label: '헬스'},
      {value: 'Homet', label: '홈트레이닝'},
      {value: 'running', label: '러닝'},
      {value: 'views', label: '스포츠 직관'},
      {value: 'yoga', label: '요가·필라테스'}
    ]
  },
  {
    key:"t3",
    text:'READING & LEARNING',
    opts:[
      {value: 'book', label: '독서'},
      {value: 'stdg', label: '스터디 모임'},
      {value: 'onstd', label: '온라인 강의'}
    ]
  },
  {
    key:"t4",
    text:'SOCIAL ACTIVITIES',
    opts:[
      {value: 'shopping', label: '쇼핑'},
      {value: 'drunk', label: '식사·술자리'},
      {value: 'cafe', label: '카페 투어'},
      {value: 'date', label: '데이트'},
      {value: 'group', label: '동호회'},
    ]
  },
  {
    key:"t5",
    text:'OUTDOOR & TRAVEL',
    opts:[
      {value: 'camp', label: '캠핑'},
      {value: 'ktravel', label: '국내여행'},
      {value: 'drive', label: '드라이브'},
      {value: 'otherN', label: '해외여행'},
    ]
  },
  {
    key:"t6",
    text:'REST & RELAXATION',
    opts:[
      {value: 'sleep', label: '잠자기'},
      {value: 'walk', label: '산책'},
      {value: 'tera', label: '테라피'},
      {value: 'rest', label: '휴식'},
    ]
  },
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
          : [...arr, val]
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
   
    // downJson();

    navigate('/choice3');
  };

   const handlebefore = (e) => {
   

    navigate('/Choice1');
  };

  const dotRoutes = ['/choice1', '/choice2', '/choice3', '/start'];
  return (
    <div className='select2'>
      <div className='progress_bar'>
        <div className='cur_bar2' />
      </div>
        <div className='quebox'>
        <h2 className='question'>당신의 취미와 흥미를 알려주세요</h2>
         <p className='sub2'>평소하는 취미활동들과 흥미를 가지는 항목들을 선택해주세요</p>
        </div>

      <div className="s_main2">
        {question.map(q => (
          <div key={q.key} className="question-block">
            <p className="question2">{q.text}</p>
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
      
        <button className="before-btn" onClick={handlebefore}>
               <FaArrowLeft className='nb' /> 이전 
          </button>
         <div className='pogressdot'>
        {dotRoutes.map(path => (
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

export default Choice2