import { useEffect, useState } from "react";
import API from "../api/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // skills lives as a comma-separated string while editing, array once saved
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    skills: "",
    location: "",
    phone: ""
  });

  const populateForm = (userData) => {
    setFormData({
      name: userData.name || "",
      bio: userData.bio || "",
      skills: Array.isArray(userData.skills) ? userData.skills.join(", ") : "",
      location: userData.location || "",
      phone: userData.phone || ""
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("/auth/profile");

        setUser(response.data.user);
        populateForm(response.data.user);

      } catch (error) {
        setMessage(
          error.response?.data?.message || "Couldn't load your profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    // split "tailoring, bookkeeping,  weaving" into a clean array
    const skillsArray = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    try {
      const response = await API.put("/auth/profile", {
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
        phone: formData.phone,
        skills: skillsArray
      });

      setUser(response.data.user);
      populateForm(response.data.user);
      setEditing(false);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Profile update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="loading">
        {message || "Couldn't load profile."}
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

        {message && <p className="error-message">{message}</p>}

        {editing ? (
          <form className="profile-form" onSubmit={handleUpdate}>

          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <label>Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) =>
              setFormData({ ...formData, bio: e.target.value })
            }
          />

          <label>Skills (comma-separated)</label>
          <input
            type="text"
            placeholder="e.g. tailoring, bookkeeping, weaving"
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
          />

          <label>Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />

          <label>Phone</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <button className="primary-btn" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => {
              populateForm(user);
              setEditing(false);
            }}
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
              <p>
                {Array.isArray(user.skills) && user.skills.length > 0
                  ? user.skills.join(", ")
                  : "Add your skills."}
              </p>
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