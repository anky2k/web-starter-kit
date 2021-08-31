import React from 'react';
import Tray from '../commons/tray';

const Rails = ({ data }) => {
  const movieRails = Object.keys(data).map(key => data[key])

  const rail = ( {items, title} ) => (
      <React.Fragment>
        <div className="pl-2 py-3">
          <h3 className="pl-2 my-3 text-white">
            {`${title}`}
          </h3>
            <Tray>
              { 
                items?.map( (item,key) => (
                  <div key = {key}>
                    {'Content'}
                  </div>
                ))
              }
            </Tray>
        </div>
      </React.Fragment>
  )
    
  return (
    <div className = "pb-20 bg-customblue">
      { movieRails.map(( entry, key )=> (
        <div key = {key}>
          {rail(entry)}
        </div>
      )) }
    </div>
  )
}

export default Rails;