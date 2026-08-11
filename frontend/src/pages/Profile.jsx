import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

   const [editing, setEditing] = useState(false);
        const [formData, setFormData] = useState({
        name: "",
        bio: "",
        skills: "",
        location: "",
        phone: ""
      });

      const handleUpdate = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  try {
    const response = await API.put(
      "/auth/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setUser(response.data.user);
    setFormData({
      name: response.data.user.name || "",
      bio: response.data.user.bio || "",
      skills: response.data.user.skills || "",
      location: response.data.user.location || "",
      phone: response.data.user.phone || ""
    });

    setEditing(false);

  } catch (error) {
    setMessage(
      error.response?.data?.message || "Profile update failed"
    );
  }
};
  useEffect(() => {
    const fetchProfile = async () => {

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {

        const response = await API.get(
          "/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
       
        setUser(response.data.user);


      setFormData({
        name: response.data.user.name || "",
        bio: response.data.user.bio || "",
        skills: response.data.user.skills || "",
        location: response.data.user.location || "",
        phone: response.data.user.phone || ""
      });

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

        <button
          className="primary-btn"
          onClick={() => setEditing(true)}
        >
        Edit Profile
        </button>
        <div></div>
        {editing ? (
          <form className="profile-form" onSubmit={handleUpdate} >

          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
            setFormData({
            ...formData,
              name: e.target.value
            })
            }
          />

          <label>Bio</label>
          <textarea
          value={formData.bio}
          onChange={(e) =>
            setFormData({
              ...formData,
              bio: e.target.value
            })
          }
        />

      <label>Skills</label>
      <input
        type="text"
        value={formData.skills}
        onChange={(e) =>
          setFormData({
            ...formData,
            skills: e.target.value
          })
        }
      />

      <label>Location</label>
      <input
        type="text"
        value={formData.location}
        onChange={(e) =>
        setFormData({
          ...formData,
          location: e.target.value
        })
        }
      />

      <label>Phone</label>
      <input
        type="text"
        value={formData.phone}
        onChange={(e) =>
        setFormData({
          ...formData,
          phone: e.target.value
        })
        }
      />

      <button className="primary-btn">
        Save Changes
      </button>

      <button
        className="secondary-btn"
        onClick={() => setEditing(false)}
      >
        Cancel
    </button>

  </form>

) : (

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

)}

      </div>

    </div>
  );
}

export default Profile;