import React from 'react'

const Meatingscard = (props) => {
  return (
    <div className='Calls schedulemeating'>
    <h4>Meating with:{props.meatings.with}</h4>
      <h4>{props.meatings.date}/{props.meatings.month}/{props.meatings.year}</h4>
    <h4>{props.meatings.hour}:{props.meatings.minute}</h4>
    </div>
  )
}

export default Meatingscard
