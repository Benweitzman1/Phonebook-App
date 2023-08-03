import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAdditionalData, setShowAdditionalData] = useState(null);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
  });

  const userUrl ='https://jsonplaceholder.typicode.com/users'

  useEffect(() => {
    // Fetch data from the server and initialize the "Data Base" on the client side
    axios.get(userUrl)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Logic to filter users based on the search term
  const filteredUsers = users.filter(user => {
    const { name, email } = user;
    return name.toLowerCase().includes(searchTerm.toLowerCase()) || email.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <div className="page-container">
      {/* Search Bar */}
      <div className="search-container">
      <span>Search:</span>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={() => setShowAddUser(true)}>Add</button>
      </div>

      {/* Add User Form (displayed conditionally) */}
      {showAddUser && (
        <div>
          {/* Input fields for new user data */}
          <button onClick={handleAddUser}>Save</button>
        </div>
      )}

      {/* Display Users */}
      {filteredUsers.map(user => (
        <div key={user.id} className={`user-container ${user.completedTasks ? 'red-border' : 'green-border'}`}>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button
            onMouseOver={() => handleMouseOver(user.id)}
            onMouseOut={handleMouseOut}
          >
            Other data
          </button>
          {showAdditionalData === user.id && (
            <div className="additional-data">
              <p>Street: {user.address.street}</p>
              <p>City: {user.address.city}</p>
              <p>Zip Code: {user.address.zipcode}</p>
            </div>
          )}
          <button>Update</button>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
