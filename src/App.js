import React, { useMemo, useState } from 'react';
import ClassCounter from './components/ClassCounter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyInput from './components/UI/input/MyInput';
import MySelect from './components/UI/select/MySelect';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Javascript', body: 'Description'},
    {id: 2, title: 'JS', body: 'Descrip'},
    {id: 3, title: 'Typescript', body: 'Des'}
  ])

  const [selectedSort, setSelectedSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const sortedPosts = useMemo(() => {
    console.log('function complete')
     if(selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts; 
  }, [selectedSort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
      return sortedPosts.filter(post => post.title.includes(searchQuery))
  }, [searchQuery, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort)
  }
 
return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <div>
        <MyInput
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder='Search...'
         />
        <MySelect
          value={selectedSort}
          onChange={sortPosts} 
          defaultValue='Sorting'
          options={[
            {value: 'title', name: 'By name'},
            {value: 'body', name: 'By description'}
          ]}
        />
      </div>
      {sortedAndSearchedPosts.length 
        ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Posts'/>
        : <h2 style={{textAlign: 'center'}}>Posts not found</h2>
      }
      
      <ClassCounter />
    </div>
  );
}

export default App;
