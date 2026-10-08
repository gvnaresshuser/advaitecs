import React, { useEffect, useState } from "react";
import "./Hoc.css";
// -----------------------------------------
// HOC: withLoading
// -----------------------------------------
function withLoading(Component) {
  return ({ loading, loadingText, ...props }) => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600"></div>
          <p className="mt-4 text-sm font-medium text-gray-600">
            {loadingText}
          </p>
        </div>
      );
    }

    return <Component {...props} />;
  };
}

// -----------------------------------------
// UserList component
// -----------------------------------------
function UserList({ users }) {
  return (
    <div className="user-list">
      <h2>Users</h2>

      {users.map((user) => (
        <div className="user-card" key={user.id}>
          <h3>{user.name}</h3>

          <div className="user-info">
            <p>📧 {user.email}</p>
            <p>🏢 {user.company.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// -----------------------------------------
// PostList component
// -----------------------------------------
function PostList({ posts }) {
  return (
    <div className="user-list">
      <h2>Posts</h2>

      {posts.slice(0, 5).map((post) => (
        <div className="user-card" key={post.id}>
          <h3>{post.id}</h3>
          <h3 style={{ color: "red" }}>{post.title}</h3>
          <div className="user-info">
            <p>{post.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// -----------------------------------------
// Send components to HOC
// -----------------------------------------
const UserListWithLoading = withLoading(UserList);
const PostListWithLoading = withLoading(PostList);

// -----------------------------------------
// App component
// -----------------------------------------
function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const [userLoading, setUserLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);

  // -----------------------------------------
  // Load Users
  // -----------------------------------------
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);

        // Keep spinner visible for 3 seconds
        setTimeout(() => {
          setUserLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Users Error:", error);
        setUserLoading(false);
      });
  }, []);

  // -----------------------------------------
  // Load Posts
  // -----------------------------------------
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);

        // Keep spinner visible for 3 seconds
        setTimeout(() => {
          setPostLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Posts Error:", error);
        setPostLoading(false);
      });
  }, []);

  // -----------------------------------------
  // UI
  // -----------------------------------------
  return (
    <>
      {" "}
      <h1>User / Posts Management</h1>
      <div className="app">
        <UserListWithLoading
          loading={userLoading}
          loadingText="Loading Users..."
          users={users}
        />

        <PostListWithLoading
          loading={postLoading}
          loadingText="Loading Posts..."
          posts={posts}
        />
      </div>
    </>
  );
}

export default App;
