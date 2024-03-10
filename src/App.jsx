import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const user = { name, email };
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log("inside post response", data); // corrected console.log statement
      const newUsers = [...users, data]
      setUsers(newUsers)
      form.reset();

    })
    .catch(error => {
      console.error("Error posting data:", error);
    });
  }
  


  return (
    <>
      <h1>User Management Server</h1>
      <h3> Number of users: {users.length}</h3>

      <form  onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="ADD User" />
      </form>

    <div>
      {
        users.map(user =>  <p key={user.id}>{user.id} Name: {user.name}  Email: {user.email} </p>)
      }
    </div>

    </>
  );
}

export default App;
