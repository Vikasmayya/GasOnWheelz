import React from 'react'

const Alerts = (props) => {
    
  return (
    props.alert &&  <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert" id="alerts">
                    <strong style={{textTransform:"capitalize"}}>{props.alert.msg}</strong>
                    </div>
  )
}

export default Alerts;