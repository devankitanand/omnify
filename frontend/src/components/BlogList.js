
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const pageSize = 10;

  // Base API URL from environment variables
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const fetchBlogs = React.useCallback(async (currentPage) => {
    try {
      const response = await axios.get(`${apiBaseUrl}blogs/?page=${currentPage}`);
      setBlogs(response.data.results);
      setCount(response.data.count);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    fetchBlogs(page);
  }, [page, fetchBlogs]);

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div>
      <h2 className="mb-4" style={{ fontSize: "24px", marginTop: "15px" }}>All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id}>
            <div className="card">
              <h3>{blog.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "#777" }}>
                By {blog.author_username} on {new Date(blog.published_date).toLocaleString()}
              </p>
            </div>
          </Link>
        ))
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
        {page > 1 && (
          <button className="pagination-button" onClick={() => setPage(page - 1)}>
            Previous
          </button>
        )}
        <span>Page {page} of {totalPages}</span>
        {page < totalPages && (
          <button className="pagination-button" onClick={() => setPage(page + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogList;
