
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BlogForm = ({ editMode = false }) => {
  const { id } = useParams(); // Only set if in edit mode
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // Base URL for API from environment variables
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api/";

  useEffect(() => {
    if (editMode && id) {
      axios
        .get(`${apiBaseUrl}blogs/${id}/`)
        .then((response) => {
          setTitle(response.data.title);
          setContent(response.data.content);
        })
        .catch((error) => {
          console.error("Error fetching blog for editing:", error);
        });
    }
  }, [editMode, id, apiBaseUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const blogData = { title, content };

    try {
      if (editMode) {
        await axios.put(`${apiBaseUrl}blogs/${id}/`, blogData, {
          headers: { Authorization: `Token ${token}` },
        });
        alert("Blog updated successfully.");
      } else {
        await axios.post(`${apiBaseUrl}blogs/`, blogData, {
          headers: { Authorization: `Token ${token}` },
        });
        alert("Blog created successfully.");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving blog:", error.response?.data || error);
      alert("Error saving blog.");
    }
  };

  return (
    <div className="card" style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2 className="text-center mb-4">{editMode ? "Edit Blog" : "Create Blog"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label>Content</label>
          <textarea
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">{editMode ? "Update Blog" : "Create Blog"}</button>
      </form>
    </div>
  );
};

export default BlogForm;
