import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const getBlogFormMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const createBlog = async (newBlog) => {
    const returnedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(returnedBlog));
  };

  const setMessageNotification = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const setErrorNotification = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const showNotification = (type) => {
    if (type === "error") {
      return <div className="error"> {errorMessage} </div>;
    }

    if (type === "message") {
      return <div className="message"> {message} </div>;
    }

    return null;
  };

  const blogForm = () => (
    <Togglable buttonLabel="create new">
      <BlogForm createBlog={createBlog} setMessage={getBlogFormMessage} />
    </Togglable>
  );

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {errorMessage != null && showNotification("error")}
        <LoginForm
          loginUser={setUser}
          loginMessage={setMessageNotification}
          loginError={setErrorNotification}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {message != null && showNotification("message")}
      <div>
        {user.name} logged-in
        <button
          type="submit"
          onClick={() => {
            window.localStorage.clear();
            setUser(null);
          }}
        >
          logout
        </button>
      </div>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlogs={setBlogs} />
      ))}
    </div>
  );
};

export default App;
