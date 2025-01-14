import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddProfile = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    profileImage: null,
    shortIntro: "",
    location: "",
    bio: "",
    github: "",
    twitter: "",
    youtube: "",
    linkedin: "",
    website: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <main className="formPage my-12">
      <div className="content-box bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <div className="formWrapper">
          {/* Back Button */}
          <Link
            to="/profile"
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

            {/* Short Intro */}
            <div className="form__field">
              <label
                htmlFor="shortIntro"
                className="block text-gray-700 font-semibold mb-2"
              >
                Short Intro
              </label>
              <input
                id="shortIntro"
                type="text"
                className="input input--text w-full px-4 py-2 border rounded focus:outline-blue-500"
                placeholder="Write a short intro"
                value={formData.shortIntro}
                onChange={handleInputChange}
              />
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

            {/* Bio */}
            <div className="form__field">
              <label
                htmlFor="bio"
                className="block text-gray-700 font-semibold mb-2"
              >
                Bio
              </label>
              <textarea
                id="bio"
                className="input input--textarea w-full px-4 py-2 border rounded focus:outline-blue-500"
                placeholder="Write something awesome..."
                value={formData.bio}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Social Links */}
            {["GitHub", "Twitter", "YouTube", "LinkedIn", "Website"].map(
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
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddProfile;
