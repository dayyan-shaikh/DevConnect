import React from 'react'
import { Link } from 'react-router-dom'

const AddSkill = () => {
  return (
    <div>
      {/* Main Section */}
      <main className="formPage my-12 px-4">
        <div className="content-box bg-white p-8 shadow-lg rounded-lg max-w-lg mx-auto">
          <div className="formWrapper">
            <Link to={"/profile"}
              className="backButton text-blue-500 hover:underline flex items-center mb-4"
            >
              <i className="im im-angle-left mr-2"></i> Back
            </Link>
            <form className="form" method="POST" id="skillForm">
              {/* Input: Text */}
              <div className="form__field mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Skill
                </label>
                <input
                  className="input input--text w-full border rounded px-4 py-2 focus:outline-blue-500"
                  id="name"
                  type="text"
                  name="text"
                  placeholder="Enter text"
                  required
                />
              </div>

              {/* Input: Textarea */}
              <div className="form__field mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  className="input input--textarea w-full border rounded px-4 py-2 focus:outline-blue-500"
                  name="message"
                  id="description"
                  placeholder="Write something awesome..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <input
                className="btn btn--sub btn--lg bg-gray-700 text-white px-6 py-3 rounded w-full hover:bg-gray-800 cursor-pointer"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AddSkill
