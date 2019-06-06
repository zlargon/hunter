import React from 'react';

const Option = (props) => {
  const { visible = 1, selectable = 1 } = props;

  const classes = ['option'];
  if (visible) classes.push('visible');
  if (selectable) classes.push('selectable');

  return (
    <div className={classes.join(' ')} {...props}>
      <div>{ props.children }</div>
      <div className="underline effect"></div>
    </div>
  );
}

export default Option;
