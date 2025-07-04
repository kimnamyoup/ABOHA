import React, { useState } from 'react'
import "../css/Login.css"
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate=useNavigate();
   const [email, setEmail] = useState("Aipoly01@gmail.com");
  const [password, setPassword] = useState("*********");

  const handleNext=()=>{
    localStorage.setItem('userToken', 'temporary-fake-token');
      navigate("/Choice1")
  }
  return (
    <div className='logp'>
       <div className='log_main'>
         <p className='lg_txt'>로그인</p>
         <div className='inputs'>
          <input type='text' value={email}
            onChange={(e) => setEmail(e.target.value)}></input>
         <input type='password' value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
         </div>
        <div className='subb'>
                  <Link  to="#" className='forgot'>Forgot password?</Link>
                  <Link  to="#" className='member'>회원가입</Link>
        </div>
        <button className='Login_btn' onClick={handleNext}>로그인</button>
        <p className='policy'>회원가입 시 서비스 약관 및 <b>개인정보 보호정책</b>에 동의하게 됩니다.</p>
       </div>
    </div>
  )
}

export default Login