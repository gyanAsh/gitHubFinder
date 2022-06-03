import React,{useContext} from 'react'
import AlertContext from '../../Context/Alert/AlertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alert !==null && (<div className={`alert alert-light`}>
          <i className='fas fa-info-circle' />
          {alertContext.alert}
    </div>)
  )
}
export default Alert