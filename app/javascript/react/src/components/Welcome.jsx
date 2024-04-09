import * as React from 'react'
import * as ReactDOM from 'react-dom'
import QuestionList from './QuestionList'
import { createRoot } from 'react-dom/client';
import { Button } from 'react-bootstrap';

class Welcome extends React.Component{
  render() {
    return (
      <div className='container'>
        <a href='/blog'>
          <Button variant='primary'>React Blog</Button>
        </a>
        <h1>Welcome to the React on Rails Tutorial</h1>
        <QuestionList />
      </div>
    );
  }
}

if(document.getElementById('welcome') !== null){
  const root = createRoot(document.getElementById('welcome'));
  root.render(
    <Welcome />
  );
}

export default Welcome