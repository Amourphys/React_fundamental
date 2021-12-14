import React, { useState } from 'react';
import ClassCounter from './components/ClassCounter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Javascript', body: 'Description'},
    {id: 2, title: 'Javascript', body: 'Description'},
    {id: 3, title: 'Javascript', body: 'Description'}
  ])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }
 
return (
    <div className="App">
      <PostForm create={createPost}/>
      <PostList posts={posts} title='Posts'/>
      <ClassCounter />
    </div>
  );
}

export default App;
