'use client';
export default function AdvisorPage() {
    // a test file that will be deleted
    // adds a user to the database, and also shows all users in the database
    function addUser() {
      fetch("/api/test-read-write", {
        method: "POST",
        body: JSON.stringify({
          email: "test2",
          password: "test as well2",
          club_name: "test club2",
        }),
      });
    }

    function getUsers() {
      fetch("/api/test-read-write", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

    return (
      <>
        <div className="text-darkBlue">
            <button onClick={addUser}>Add User</button>
            <button onClick={getUsers}>Get Users</button>
          </div>
      </>
    );
  }
  