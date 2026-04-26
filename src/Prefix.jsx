import React from 'react';
import {useCallback} from 'react';


const Prefix = React.memo(
  function Prefix(props) {

  const { 
        prefix, 
        isActive, 
        onToggle 
      } = props

  const handleClick = useCallback(() => {
    onToggle(prefix)
  }, [prefix, onToggle])
  console.log('render prefix', prefix);

  return (
    <span
      className={`prefix ${isActive ? 'active' : ''}`}
      onClick={() => handleClick}
    >
      [{prefix}]
    </span>
  );
});


export default Prefix