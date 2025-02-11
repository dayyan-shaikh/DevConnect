import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProfile = () => {
  const [profileId, setProfileId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    profileImage: null,
    shortIntro: "",
    about:"",
    location: "",
    github: "",
    twitter: "",
    linkedin: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedProfileId = localStorage.getItem("profileId");
    if (storedProfileId) {
      setProfileId(storedProfileId);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileId) {
        console.error("Profile ID is not set!");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/profile/profile/${profileId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const profile = response.data.profile;
          setFormData({ 
            fname: profile.firstName || "",
            lname: profile.lastName || "",
            profileImage: profile.profileImage || null,
            location: profile.location || "",
            shortIntro: profile.shortIntro || "",
            about: profile.about || "",
            github: profile.socialGithub || "",
            twitter: profile.socialTwitter || "",
            linkedin: profile.socialLinkedin || "",
            website: profile.socialWebsite || "",
          });
        } else {
          toast.error("Failed to fetch profile details.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Error loading profile details.");
      } finally {
        setLoading(false);
      }
    };

    if (profileId) {
      fetchProfile();
    }
  }, [profileId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSubmit = {
      firstName: formData.fname,
      lastName: formData.lname,
      location: formData.location,
      shortIntro: formData.shortIntro,
      about: formData.about,
      socialGithub: formData.github,
      socialTwitter: formData.twitter,
      socialLinkedin: formData.linkedin,
      socialWebsite: formData.website,
    };

    const token = localStorage.getItem('token');

    try {
      const response = await axios.patch(
        `http://localhost:5000/profile/update`,
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        navigate(`/profile/${profileId}`);
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="formPage my-12">
      <div className="content-box bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <div className="formWrapper">
          {/* Back Button */}
          <Link to={`/profile/${profileId}`}
            className="backButton text-blue-500 hover:underline flex items-center mb-4"
          >
            <i className="fas fa-angle-left mr-2"></i> Back
          </Link>

          {/* Form */}
          <form
            className="form space-y-6"
            method="POST"
            id="profileForm"
            onSubmit={handleSubmit}
          >
            {/* First Name */}
            <div className="form__field">
              <label
                htmlFor="fname"
                className="block text-gray-700 font-semibold mb-2"
              >
                First Name
              </label>
              <input
                id="fname"
                type="text"
                className="input input--text w-full px-4 py-2 border rounded focus:outline-blue-500"
                placeholder="Enter your first name"
                value={formData.fname}
                onChange={handleInputChange}
              />
            </div>

            {/* Last Name */}
            <div className="form__field">
              <label
                htmlFor="lname"
                className="block text-gray-700 font-semibold mb-2"
              >
                Last Name
              </label>
              <input
                id="lname"
                type="text"
                className="input input--text w-full px-4 py-2 border rounded focus:outline-blue-500"
                placeholder="Enter your last name"
                value={formData.lname}
                onChange={handleInputChange}
              />
            </div>

            {/* Profile Picture */}
            <div className="form__field">
              <label
                htmlFor="profileImage"
                className="block text-gray-700 font-semibold mb-2"
              >
                Profile Picture
              </label>
              <input
                id="profileImage"
                type="file"
                className="input input--text w-full px-4 py-2 border rounded focus:outline-blue-500"
                onChange={handleFileChange}
              />
              {formData.profileImage && (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Profile Preview"
                  className="mt-4 w-full h-48 object-cover rounded border"
                />
              )}
            </div>

            {/* Location */}
            <div className="form__field">
              <label
                htmlFor="location"
                className="block text-gray-700 font-semibold mb-2"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                className="input input--text w-full px-4 py-2 border rounded focus:outline-blue-500"
                placeholder="Enter your location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            {/* About */}
            <div className="form__field">
              <label
                htmlFor="about"
                className="block text-gray-700 font-semibold mb-2"
              >
                About
              </label>
              <textarea
                id="about"
                className="input input--textarea w-full px-4 py-2 border rounded focus:outline-blue-500"
                placeholder="Write something awesome..."
                value={formData.about}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Short Intro */}
            <div className="form__field">
              <label
                htmlFor="shortIntro"
                className="block text-gray-700 font-semibold mb-2"
              >
                Short Intro
              </label>
              <textarea
                id="shortIntro"
                className="input input--textarea w-full px-4 py-2 border rounded focus:outline-blue-500"
                placeholder="Write something awesome..."
                value={formData.shortIntro}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Social Links */}
            {["GitHub", "Twitter", "LinkedIn", "Website"].map(
              (field) => (
                <div className="form__field" key={field.toLowerCase()}>
                  <label
                    htmlFor={field.toLowerCase()}
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    {field}
                  </label>
                  <input
                    id={field.toLowerCase()}
                    type="text"
                    className="input input--text w-full px-4 py-2 border rounded focus:outline-blue-500"
                    placeholder={`Enter ${field} link`}
                    value={formData[field.toLowerCase()]}
                    onChange={handleInputChange}
                  />
                </div>
              )
            )}

            {/* Submit Button */}
            <div>
              <input
                className="btn btn--sub btn--lg w-full bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 cursor-pointer"
                type="submit"
                value={loading ? "Submitting..." : "Submit"}
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddProfile;