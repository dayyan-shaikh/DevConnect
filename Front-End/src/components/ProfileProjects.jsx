import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProfileProjects = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found!');
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/project/getprojects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setProjects(response.data.projects);
        } else {
          toast.error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('An error occurred while fetching the projects.');
      }
    };

    fetchProjects();
  }, [profileId]);

  const handleDeleteProject = async (projectId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found!');
        return;
      }

      const response = await axios.delete(
        `http://localhost:5000/project/deleteproject/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Project deleted successfully!');
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== projectId)
        );
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('An error occurred while deleting the project.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (projectId) => {
    navigate(`/profile/addproject?edit=${projectId}`);
  };

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold mb-2">Projects</h3>
          <Link to="/profile/addproject">
            <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-200">
              + Add Project
            </button>
          </Link>
        </div>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project._id} className="project-card bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => handleEditClick(project._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
                {project.featured_image && (
                  <img src={project.featured_image} alt={project.title} className="mb-4" />
                )}
                <p>
                  <strong>Title :</strong> {project.title}
                </p>
                <p>
                  <strong>Description :</strong> {project.description}
                </p>
                {project.demo_link && (
                  <p className="p-2 bg-gray-200 rounded-md mb-2">
                    <strong>Demo Link: </strong>
                    <a
                      href={project.demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline break-words"
                    >
                      {project.demo_link}
                    </a>
                  </p>
                )}
                {project.source_link && (
                  <p className="p-2 bg-gray-200 rounded-md mb-2">
                    <strong>Source Code: </strong>
                    <a
                      href={project.source_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline break-words"
                    >
                      {project.source_link}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have not uploaded any projects yet</p>
        )}
      </div>
    </div>
  );
};

export default ProfileProjects;