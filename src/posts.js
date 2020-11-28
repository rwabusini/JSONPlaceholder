import React, { Component } from 'react'

class Posts extends Component {
  constructor(props) {
    super(props)
    this.state = {
     comments:[],
     posts: [],
      isLoading: false,
      isError: false
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (response.ok) {
      var posts = await response.json()
      console.log(posts)
      this.setState({ posts, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

  renderPostsHeader = () => {
    return Object.keys(this.state.posts[0]).map(attr => <p key={attr}>{attr.toUpperCase()}</p>)
  }


  renderPosts = () => {
    return this.state.posts.map(post => {
      return (
        <div key={post.id}>
          <h6>{post.id}</h6>
          <p>{post.title}</p>
          <p>{post.body}</p>
          <button onClick={()=> this.deletePost(post.id)}> delete </button>
          <button onClick={()=> this.postComments(post.id)}> View Comments </button>
          <div></div>
        </div>
      )
    }) 
  }


  deletePost = (postId) => {
    console.log(postId) 
  fetch('https://jsonplaceholder.typicode.com/posts/'+postId, {
  method: 'DELETE',
   })
   .then((del) => del.json())
   .then((del) => { console.log(del)  })
   
}


postComments = (postId) => {
    fetch('https://jsonplaceholder.typicode.com/posts/'+postId +'/comments')
    .then((response) => { 
      var comments = response.json()
      this.setState({comments})
      
    })
     .then(() => console.log(this.state.comments))
}


  render() {  
    const { posts, isLoading, isError } = this.state
    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isError) {
      return <div>Error</div>
    }

    return posts.length > 0
      ? (
       <div>{this.renderPosts()}</div>     
         
      ) : (
        <div>
          No Posts.
      </div>
      )
  }
}

export default Posts