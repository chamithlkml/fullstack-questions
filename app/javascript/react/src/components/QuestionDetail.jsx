import * as React from 'react'
import * as ReactDOM from 'react-dom'

class QuestionDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      likeCount: props.question.like_count,
      dislikeCount: props.question.dislike_count
    };
    this.updateLikeCount = this.updateLikeCount.bind(this)
    this.updateDislikeCount = this.updateDislikeCount.bind(this)
  }

  async updateQuestionCounter(questionId, type){
    const response = await fetch(`http://localhost:3000/api/v1/questions/${questionId}/update_counter`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type: type })
    })
    return response.json();
  }

  updateLikeCount(){
    this.setState(state => ({ likeCount: state.likeCount + 1 }))
    this.updateQuestionCounter(this.props.question.id, 'like').then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error);
    })
  }

  updateDislikeCount(){
    this.setState(state => ({dislikeCount: state.dislikeCount + 1}))
    this.updateQuestionCounter(this.props.question.id, 'dislike').then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error);
    })
  }

  render () {
    return(
      <div className='card rounded-0 mt-3'>
        <div className='card-body'>
          <h3 className='card-title'>{this.props.question.title}</h3>
          <p className='lead'>
            <span className='badge bg-primary'>{this.props.question.tag}</span>
          </p>
          <button type="button" className="btn btn-primary position-relative me-2" onClick={this.updateLikeCount}>
            Like
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {
                this.state.likeCount > 0 ? this.state.likeCount : ''
              }
            </span>
          </button>
          <button type="button" className="btn btn-primary position-relative" onClick={this.updateDislikeCount}>
            Dislike
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {
                this.state.dislikeCount > 0 ? this.state.dislikeCount : ''
              }
            </span>
          </button>
        </div>
      </div>
    );
  }

  // render () {
  //   return(
  //     <div className='card rounded-0 mt-3'>
  //       <div className='card-body'>
  //         <h3 className='card-title'>{this.props.question.title}</h3>
  //         <p className='lead'>
  //           <span className='badge bg-primary'>{this.props.question.tag}</span>
  //         </p>
  //         <button onClick={()=>{this.setState((state) => ({ likeCount: state.likeCount + 1 }))}}>Like</button>
  //         <button onClick={() => {this.setState(state => ({ likeCount: state.likeCount - 1}))}}>Deslike</button>
  //         {
  //           this.state.likeCount > 0 ? 
  //             <span className='badge bg-primary'>{this.state.likeCount}</span> : ''
  //         }
  //       </div>
  //     </div>
  //   );
  // }
};

export default QuestionDetail;