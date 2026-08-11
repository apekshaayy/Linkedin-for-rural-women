import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {

        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUser(response.data.user);

      } catch (error) {

        localStorage.removeItem("token");
        setMessage("Session expired. Please login again.");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    };

    fetchProfile();

  }, [navigate]);

  if (!user) {
    return (
      <div className="loading">
        {message || "Loading profile..."}
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h1>{user.name}</h1>

        <p className="email">
          {user.email}
        </p>

        <div className="profile-info">

          <div>
            <span>Bio</span>
            <p>{user.bio || "Tell people about yourself."}</p>
          </div>

          <div>
            <span>Skills</span>
            <p>{user.skills || "Add your skills."}</p>
          </div>

          <div>
            <span>Location</span>
            <p>{user.location || "Add your location."}</p>
          </div>

          <div>
            <span>Phone</span>
            <p>{user.phone || "Add your phone number."}</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;