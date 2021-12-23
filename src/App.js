import React, { useEffect, useState } from 'react';
import ClassCounter from './components/ClassCounter';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/modal/MyModal';
import { usePosts } from './hooks/usePosts';
import { useFetching } from './hooks/useFetching';
import './styles/App.css';
import PostService from './API/PostService';
import Loader from './loader/Loader';
import { getPageCount } from './utils/pages';
import Pagination from './components/UI/pagination/Pagination';

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
      const response = await PostService.getAll(limit, page)
      setPosts(response.data)
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts()
  }, [page])
  
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }
  // Получаем пост из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }
 
return (
    <div className="App">
      <MyButton onClick={fetchPosts}>get posts</MyButton>
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Create user
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      {postError &&
        <h1>Error ${postError}</h1>
      }
      {isPostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Posts'/>
      }
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
      <ClassCounter />
    </div>
  );
}

export default App;
