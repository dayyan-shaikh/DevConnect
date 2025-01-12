import React from "react";
import { Link } from "react-router-dom";

const AddProject = () => {
  return (
    <div>
      <main className="formPage my-12">
        <div className="content-box bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <div className="formWrapper">
            {/* Back Button */}
            <Link to={'/profile'}
              href="#"
              className="backButton text-blue-500 hover:underline flex items-center mb-4"
            >
              <i className="im im-angle-left mr-2"></i> Back
            </Link>

            {/* Form */}
            <form className="form space-y-6" method="POST" id="projectForm">
              {/* Title Field */}
              <div className="form__field">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Title
                </label>
                <input
                  className="input input--text w-full px-4 py-2 border rounded focus:outline-blue-500"
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Enter text"
                  required
                />
              </div>

              {/* Cover Image Field */}
              <div className="form__field">
                <label
                  htmlFor="featured_image"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Cover Image
                </label>
                <input
                  className="input input--text w-full px-4 py-2 border rounded focus:outline-blue-500"
                  id="featured_image"
                  type="file"
                  name="featured_image"
                //   onChange={onFileSelected}
                  required
                />
                <img
                //   src={imagePreview}
                  alt="Project Cover"
                  className="mt-4 w-full h-48 object-cover rounded border"
                  id="img_src"
                />
              </div>

              {/* Description Field */}
              <div className="form__field">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Description
                </label>
                <textarea
                  className="input input--textarea w-full px-4 py-2 border rounded focus:outline-blue-500"
                  id="description"
                  name="description"
                  placeholder="Write something awesome..."
                  required
                ></textarea>
              </div>

              {/* Demo Link Field */}
              <div className="form__field">
                <label
                  htmlFor="demo_link"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Demo Link
                </label>
                <input
                  className="input input--text w-full px-4 py-2 border rounded focus:outline-blue-500"
                  id="demo_link"
                  type="text"
                  name="demo_link"
                  placeholder="Enter text"
                />
              </div>

              {/* Source Code Link Field */}
              <div className="form__field">
                <label
                  htmlFor="source_link"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Source Code Link
                </label>
                <input
                  className="input input--text w-full px-4 py-2 border rounded focus:outline-blue-500"
                  id="source_link"
                  type="text"
                  name="source_link"
                  placeholder="Enter text"
                />
              </div>

              {/* Submit Button */}
              <div>
                <input
                  className="btn btn--sub btn--lg w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProject;
