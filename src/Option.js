import React from 'react';

const Option = ({visiable = true, children}) => {

  let classes = 'option';
  if (visiable) {
    classes += ' selectable';
  }

  return (
    <div className={classes}>
      <div>{ children }</div>
      <div className="underline effect"></div>
    </div>
  );
}

export default Option;
