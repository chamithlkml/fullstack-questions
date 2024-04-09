import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';

const Blog = () => {
  return (
    <div className='container'>
      <h1>Welcome to the React Blog</h1>
    </div>
  )
}

if(document.getElementById('blog') !== null){
  const root = createRoot(document.getElementById('blog'));
  root.render(
    <Blog />
  );
}

export default Blog