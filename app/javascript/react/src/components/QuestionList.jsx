import * as React from 'react'
import * as ReactDOM from 'react-dom'
import QuestionDetail from './QuestionDetail'
import NoQuestionsMessage from './NoQuestionsMessage';
import Spinner from './Spinner';
import CreateQuestionForm from './CreateQuestionForm';
import { Alert, Button } from 'react-bootstrap'

class QuestionList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      questionsList: [],
      tagsList: [],
      selectedTagId: 0,
      selectedTag: 'All',
      showNoQuestionsMessage: false,
      showSpinner: false,
      successMessage: '',
      showSuccessMessage: false
    }
    this.changeTag = this.changeTag.bind(this)
    this.fetchTags = this.fetchTags.bind(this)
    this.updateQuestions = this.updateQuestions.bind(this)
    this.showSuccessMessage = this.showSuccessMessage.bind(this)
  }

  fetchTags(){
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3000/api/v1/tags`)
      .then(response => response.json())
      .then((data) => {
        this.setState(state => ({
          tagsList: data
        }))
        resolve(data)
      })
      .catch(err => reject(err))
    });
  }

  fetchQuestions(tagId){
    return new Promise((resolve, reject) => {
      this.setState(state => ({
        showSpinner: true,
        showNoQuestionsMessage: false
      }))
      fetch(`http://localhost:3000/api/v1/questions?tag_id=${tagId}`)
      .then(response => response.json())
      .then(data => {
        this.setState(state => ({
          showSpinner: false
        }))
        resolve(data);
      }).catch(err => {
        this.setState(state => ({
          showSpinner: false
        }))
        reject(err)
      })
    });
  }

  updateQuestions(){
    this.fetchQuestions(this.state.selectedTagId).then(data => {
      this.setState(state => ({
        questionsList: data,
        showNoQuestionsMessage: data.length == 0
      }))
    })
  }

  componentDidMount(){
    this.updateQuestions()
  }

  changeTag(event){
    this.fetchQuestions(event.target.value).then(data => {
      let tagListArr = this.state.tagsList
      let selectedTagObjs = tagListArr.filter((tagObj) => tagObj.id == event.target.value )
      this.setState(state => ({
        questionsList: data,
        selectedTagId: event.target.value,
        selectedTag: selectedTagObjs[0].label,
        showNoQuestionsMessage: data.length == 0
      }))
    })
  }

  showSuccessMessage(message){
    this.setState(state => ({
      successMessage: message,
      showSuccessMessage: true
    }))
  }

  render (){
  
    return (
      <div>
        <div>
          {
            this.state.showSuccessMessage && (<Alert variant="success" onClose={() => this.setState(state => ({showSuccessMessage: false}))} dismissible>
            <Alert.Heading>Well done!</Alert.Heading>
              <p>
                { this.state.successMessage }
              </p>
            </Alert>)
          }
        </div>
        <CreateQuestionForm fetchTags={this.fetchTags} updateQuestions={this.updateQuestions} showSuccessMessage={this.showSuccessMessage} />
        <div className='row'>
          <div className='col-lg-12 max-auto'>
            <p className='lead fw-bold'>Filter Questions by Tags</p>
            <select className='form-select form-select-lg' onChange={this.changeTag}>
              {
                this.state.tagsList.map(tag => 
                    <option key={tag.id} value={tag.id}>{tag.label}</option>
                  )
              }
            </select>
            {
            this.state.questionsList.length > 0 ?
              this.state.questionsList.map((question) => 
                <QuestionDetail question={question} key={question.id} />
              ) : ''
            }
            { this.state.showSpinner && <Spinner /> }
            { this.state.showNoQuestionsMessage && <NoQuestionsMessage selectedTag={this.state.selectedTag} />}
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionList