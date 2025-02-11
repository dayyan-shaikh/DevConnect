import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddProject = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [profileId, setProfileId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [sourceLink, setSourceLink] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedProfileId = localStorage.getItem("profileId");
    if (storedProfileId) {
      setProfileId(storedProfileId);
    }

    const projectId = searchParams.get("edit");
    if (projectId) {
      fetchProjectData(projectId);
    }
  }, [searchParams]);

  const fetchProjectData = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found!');
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/project/project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const project = response.data.project;
        setTitle(project.title);
        setDescription(project.description);
        setDemoLink(project.demo_link);
        setSourceLink(project.source_link);
      } else {
        toast.error('Failed to fetch project data');
      }
    } catch (error) {
      console.error('Error fetching project data:', error);
      toast.error('An error occurred while fetching the project data.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found!');
      return;
    }

    const formData = {
      profileId,
      title,
      description,
      demo_link: demoLink,
      source_link: sourceLink
    };

    const projectId = searchParams.get("edit");
    const url = projectId
      ? `http://localhost:5000/project/project/${projectId}`
      : 'http://localhost:5000/project/createproject';
    const method = projectId ? 'patch' : 'post';

    try {
      const response = await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        toast.success(`Project ${projectId ? 'updated' : 'added'} successfully!`);
        setTimeout(() => navigate(`/profile/${profileId}`), 2000);
      } else {
        toast.error(`Failed to ${projectId ? 'update' : 'add'} project`);
      }
    } catch (error) {
      console.error(`Error ${projectId ? 'updating' : 'submitting'} project:`, error);
      toast.error(`An error occurred while ${projectId ? 'updating' : 'submitting'} the project.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="formPage my-12">
        <div className="content-box bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <div className="formWrapper">
            {/* Back Button */}
            <Link to={`/profile/${profileId}`}
              className="backButton text-blue-500 hover:underline flex items-center mb-4"
            >
              <i className="im im-angle-left mr-2"></i> Back
            </Link>

            {/* Form */}
            <form className="form space-y-6" method="POST" id="projectForm" onSubmit={handleSubmit}>
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  value={demoLink}
                  onChange={(e) => setDemoLink(e.target.value)}
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
                  value={sourceLink}
                  onChange={(e) => setSourceLink(e.target.value)}
                />
              </div>

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
    </div>
  );
};

export default AddProject;