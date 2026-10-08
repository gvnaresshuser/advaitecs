import React from 'react';
import useFetch from '../hooks/useFetch';

function PostsList() {
    const { data, loading, error, refetch } = useFetch('https://jsonplaceholder123.typicode.com/posts');
    //const { data, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/users');

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
      <div style={{ padding: "20px" }}>
        <h2>Posts</h2>
        <button onClick={refetch}>🔄 Refresh</button>
        <ul>
          {data.slice(0, 15).map((post) => (
            <li key={post.id}>
              {/* ===================== POSTS ======================= */}
              <strong>{post.id}</strong>
              <br />
              <strong>{post.title}</strong>
              <br />
              {post.body}
              {/* ===================== USERS ======================= */}
             {/*  {post.name}
              <br />
              {post.email}
              <br />
              {post.phone}
              <br />
              {post.company.catchPhrase} */}
              <hr/>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default PostsList;
//slice(0, 15) is used to display only the first 15 posts from the data array.