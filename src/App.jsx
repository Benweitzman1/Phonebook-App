import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAdditionalData, setShowAdditionalData] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
  });

  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);

  const usersUrl = 'https://jsonplaceholder.typicode.com/users';
  const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

  useEffect(() => {
    // Fetch data from the server and initialize the "Data Base" on the client side
    axios
      .get(usersUrl)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedUserId !== null) {
      axios
        .get(`${todosUrl}?userId=${selectedUserId}`)
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => {
          console.error('Error fetching todos:', error);
        });

      axios
        .get(`${postsUrl}?userId=${selectedUserId}`)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });
    }
  }, [selectedUserId]);

  const hasCompletedTasks = (userId) => {
    const userTodos = todos.filter((todo) => todo.userId === userId);
    return userTodos.some((todo) => todo.completed);
  };

  // Logic to filter users based on the search term
  const filteredUsers = users
    .map((user) => ({ ...user, hasCompletedTasks: hasCompletedTasks(user.id) }))
    .filter((user) => {
      const { name, email } = user;
      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  // Logic to handle adding a new user
  const handleAddUser = () => {
    // Call the server to add the new user (if applicable)
    // Reset the newUserData state and hide the add user form
    setShowAddUser(false);
    setNewUserData({
      name: '',
      email: '',
      // Other fields you may want to include for a new user
    });
  };

  const handleMouseOver = (userId) => {
    setShowAdditionalData(userId);
  };

  const handleMouseOut = () => {
    setShowAdditionalData(null);
  };

  const handleOtherDataClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="page-container">
      {/* Search Bar */}
      <div className="search-and-add">
        <div className="search-container">
          <span>Search:</span>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button onClick={() => setShowAddUser(true)}>Add</button>
        </div>
        {showAddUser && (
          <div>
            {/* Input fields for new user data */}
            <button onClick={handleAddUser}>Save</button>
          </div>
        )}
      </div>

      <div className="users-container">
        {/* Display Users */}
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className={`user-container ${user.hasCompletedTasks ? 'red-border' : 'green-border'}`}
          >
            <button onClick={() => handleOtherDataClick(user.id)}>ID: {user.id}</button>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <button onMouseOver={() => handleMouseOver(user.id)} onMouseOut={handleMouseOut}>
              Other data
            </button>
            {showAdditionalData === user.id && (
              <div className="additional-data">
                <p>Street: {user.address.street}</p>
                <p>City: {user.address.city}</p>
                <p>Zip Code: {user.address.zipcode}</p>
              </div>
            )}
            {hasCompletedTasks(user.id) && <div className="completed-tasks">Completed Tasks</div>}
            <button>Update</button>
            <button>Delete</button>
          </div>
        ))}
      </div>

      {/* Display Todos and Posts */}
      {selectedUserId !== null && (
          <div className="todos-posts">
          <h2>Todos - User {selectedUserId}</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <span>Title: {todo.title}</span>
                <br />
                <span>Completed: {todo.completed ? 'Yes' : 'No'}</span>
              </li>
            ))}
          </ul>
          <h2>Posts - User {selectedUserId}</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;