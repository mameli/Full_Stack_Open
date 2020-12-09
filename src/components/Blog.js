import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlogs }) => {
  const [isHidden, setHidden] = useState(true);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikeUpdate = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user,
    };
    await blogService.update(blog.id, updatedBlog);
    blogService.getAll().then((blogs) => updateBlogs(blogs));
  };

  if (isHidden) {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setHidden(!isHidden)}>
          {isHidden ? "view" : "hide"}
        </button>
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        <h3>
          {blog.title}{" "}
          <button onClick={() => setHidden(!isHidden)}>
            {isHidden ? "view" : "hide"}
          </button>
        </h3>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={() => handleLikeUpdate()}>like</button>
        </p>
      </div>
    );
  }
};

export default Blog;
