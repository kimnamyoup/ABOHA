import React from 'react'
import "../css/Login.css"
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <div className='logp'>
       <div className='log_main'>
         <p className='lg_txt'>로그인</p>
         <div className='inputs'>
          <input type='text' value={"Aipoly01@gmail.com"}></input>
         <input type='password' value={"*********"}></input>
         </div>
        <div className='subb'>
                  <Link className='forgot'>Forgot password?</Link>
                  <Link className='member'>회원가입</Link>
        </div>
        <Link className='Login_btn' to="/Choice1">로그인</Link>
        <p className='policy'>회원가입 시 서비스 약관 및 <b>개인정보 보호정책</b>에 동의하게 됩니다.</p>
       </div>
    </div>
  )
}

export default Login