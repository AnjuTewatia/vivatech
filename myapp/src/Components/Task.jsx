import React, { useState, useEffect } from "react";
import "./Task.css";

const Task = () => {
  // State to hold the list of tasks
  const [posts, setPosts] = useState([]);

  // State to hold the data for a new task
  const [newPost, setNewPost] = useState({
    title1: "",
  });

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch tasks from the API
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://dark-rose-gharial-vest.cyclic.cloud/taskmanager"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle the creation of a new task
  const handleCreate = async () => {
    try {
      const response = await fetch(
        "https://dark-rose-gharial-vest.cyclic.cloud/taskmanager",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Fetch the updated list of tasks after creating a new one
      fetchPosts();

      // Reset the newPost state for the next creation
      setNewPost({
        id: 0, // Assuming id as an indicator for a new task
        title1: "",
      });

      console.log("POST request successful", newPost);
    } catch (error) {
      console.error("Error during POST request:", error.message);
    }
  };

  // Function to handle the deletion of a task by ID
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://dark-rose-gharial-vest.cyclic.cloud/taskmanager/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Fetch the updated list of tasks after deleting
      fetchPosts();

      console.log("DELETE request successful");
    } catch (error) {
      console.error("Error during DELETE request:", error.message);
    }
  };

  return (
    <div>
      {/* Displaying the list of tasks */}
      <h1>Task Management</h1>
      <div>
        <table>
          <thead>
            <tr>{/* <th>Task</th> */}</tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <div key={post._id}>
                <h3>{post.title1}</h3>
                {/* Button to delete a task */}
                <button className="btn" onClick={() => handleDelete(post._id)}>
                  Delete
                </button>
              </div>
            ))}
          </tbody>
        </table>
      </div>

      <div></div>
      <hr />
      <hr />

      {/* Form to create a new task */}
      <div>
        <h2>Create New Task</h2>
        {/* Input field for entering the task title */}
        <label>
          <input
            type="text"
            placeholder="enter your text......."
            value={newPost.title1}
            onChange={(e) => setNewPost({ ...newPost, title1: e.target.value })}
          />
        </label>
        <br />
        {/* Button to create a new task */}
        <button onClick={handleCreate} className="button">
          Create Task
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Task;
