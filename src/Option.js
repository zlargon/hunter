import React from 'react';

const Option = (props) => {
  const { visiable = true } = props;

  let classes = 'option';
  if (visiable) {
    classes += ' selectable';
  }

  return (
    <div className={classes} {...props}>
      <div>{ props.children }</div>
      <div className="underline effect"></div>
    </div>
  );
}

export default Option;
