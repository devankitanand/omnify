
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  // Base API URL from environment variables
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api/";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}blogs/${id}/`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog detail:", error);
      }
    };

    fetchBlog();
  }, [id, apiBaseUrl]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`${apiBaseUrl}blogs/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        alert("Blog deleted successfully.");
        navigate("/");
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Error deleting blog.");
      }
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="card" style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <button style={{ marginBottom: "20px" }} onClick={() => navigate(-1)}> ← </button>
      <h2>{blog.title}</h2>
      <p style={{ color: "#777", fontSize: "0.9rem" }}>
        By {blog.author_username} on {new Date(blog.published_date).toLocaleString()}
      </p>
      <p style={{ margin: "1rem 0" }}>{blog.content}</p>

      {/* Render Edit and Delete buttons only if the logged-in user is the author */}
      {localStorage.getItem("username") === blog.author_username && (
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", marginTop: "2rem" }}>
          <Link to={`/blogs/${blog.id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete} style={{ backgroundColor: "#d93025", color: "#fff" }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
