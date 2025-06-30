
import "../css/btn.css"
import PropTypes from 'prop-types';
import { FaArrowRight } from "react-icons/fa";


const Sbutton = ({
  children,
  onClick,
  className = '',
  active = false,      
  disabled = false,
}) =>{


  return (
    <button
      type="button"
      onClick={onClick}
      className={[
      's_btn',
      active ? 's_btn-active' : '',
      className
    ]
      .filter(Boolean)
      .join(' ')}
    disabled={disabled} 
    >
      {children}
      <FaArrowRight />
    </button>
  )
};
Sbutton.prototype={
    children:PropTypes.node.isRequired,
  onClick:PropTypes.func,
  className:PropTypes.string,
  active:PropTypes.bool,
}

export default Sbutton