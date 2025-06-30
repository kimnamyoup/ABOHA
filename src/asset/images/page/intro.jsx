import React, { useEffect, useState } from 'react'
import "../../css/Intro.css"
import {  useNavigate } from 'react-router-dom';
import Choice1 from './Choice1';
import Mainview from './Mainview';

const Intro = () => {
  const [loading, setLoding] = useState(true);

	const navigate = useNavigate();
	const timeout = () => {
		setTimeout(() => {
			navigate('/Choice1');
		}, 5000);
	};
	useEffect(() => {
		timeout();
		return () => {
			clearTimeout(timeout);
		};
	}); 
  return (
    <div className='view'>
     <h1 className='logo'/>
     <div className='bg'></div>
    </div> 
  )
}

export default Intro