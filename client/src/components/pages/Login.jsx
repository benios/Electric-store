import React from 'react';

import loginImg from './../../assests/images/login.png'


function Login(props){
  return (
    <div>
      <div className='base-container' dir="rtl" >
        <div className='header'>התחבר</div>
        <div className='content'>
          <div className='image'>
            <img src={loginImg}/>
          </div>
          <div className='form' >
            <div className='form-group'>
            <label for="username">שם משתמש</label>
            <input dir="rtl" type="text"  id="username" placeholder='שם משתמש'></input>
            </div>
            <div className='form-group'>
            <label for="userPassword">סיסמא</label>
            <input dir="rtl" type="password"  id="userPassword" placeholder='סיסמא'></input>
            </div>
            <div className='footer'>
              <button type='button' className='btn'>
                התחבר
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;