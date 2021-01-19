import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import classnames from 'classnames'

const SideButton = ({current, onClick}) => {

  return (
    <div className={classnames('right-side', current.toLowerCase() === 'login' ? 'right' : 'left')} onClick={onClick}>
      <div className='inner-container'>
        <div className='text'>
          {current}
        </div>
      </div>
    </div>
  )
}

SideButton.defaultProps = {
  current: '',
  onClick: noop,
};

SideButton.propTypes = {
  current: PropTypes.string,
  onClick: PropTypes.func,
};

export default SideButton