import React from 'react';

function RightSide(props){

  return (
    <div className='right-side'>
      <div className='inner-container'>
        <div className='text'>
          {props.current}
        </div>
      </div>
    </div>
  )
}

export default RightSide