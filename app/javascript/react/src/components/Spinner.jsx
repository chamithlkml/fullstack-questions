import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Spinner extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
}

export default Spinner;