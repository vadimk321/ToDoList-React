import React from 'react';


const Prefix = React.memo(
  function Prefix(props) {

  const { 
        prefix, 
        isActive, 
        onToggle 
      } = props
  console.log('render prefix', prefix);

  return (
    <span
      className={`prefix ${isActive ? 'active' : ''}`}
      onClick={() => onToggle(prefix)}
    >
      [{prefix}]
    </span>
  );
});


export default Prefix