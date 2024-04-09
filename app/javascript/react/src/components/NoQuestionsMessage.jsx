import * as React from 'react'
import * as ReactDOM from 'react-dom'

class NoQuestionsMessage extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <div className="mt-4 alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Oops!</strong> No questions found for the tag {this.props.selectedTag}.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    );
  }
}

export default NoQuestionsMessage;