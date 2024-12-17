import React from "react";

function AdminDashboard() {
  let user = JSON.parse(window.localStorage.getItem("user"));

  if (!user) {
    return <p>No user data found.</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray">
      <div className="bg-slate-900 text-gray-800 p-8 rounded-lg shadow-xl w-full max-w-2xl m-4">
        <h2 className="text-3xl font-semibold text-center text-purple-700 mb-6">
          Admin Dashboard
        </h2>
        <p className="text-center text-lg text-gray-100 mb-4">
          Welcome to the admin dashboard
        </p>

        <div className="space-y-6">
          <div className=" p-4 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-semibold text-purple-800">{user.username}</h1>
          </div>
          <div className=" p-4 rounded-lg shadow-md">
            <p className="text-gray-100"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-100"><strong>Role:</strong> {user.role}</p>
            <p className="text-gray-100"><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
