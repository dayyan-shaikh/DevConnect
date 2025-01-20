import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa"; // Edit and Trash icons

const ProfileSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch skills when component mounts
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage

        if (!token) {
          console.error("No token found!");
          return;
        }

        // Make GET request to fetch skills from the backend
        const response = await axios.get(
          "http://localhost:5000/skill/getSkills",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setSkills(response.data.skills);
        } else {
          console.error("Failed to fetch skills:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Handle Skill Deletion
  const handleDeleteSkill = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found!");
        return;
      }

      // Make DELETE request to delete skill
      const response = await axios.delete(
        `http://localhost:5000/skill/deleteskill/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Skill deleted successfully!");
        setSkills(skills.filter((skill) => skill._id !== id));
      } else {
        toast.error("Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast.error("An error occurred while deleting the skill.");
    }
  };

  // Handle editing skill (navigating to AddSkill page)
  const handleEditSkill = (skillId) => {
    // Navigate to AddSkill page with the skill ID in the query parameter
    navigate(`/addskill?edit=${skillId}`);
  };

  return (
    <div className="skills-section">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          <Link to="/addskill">
            <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-200">
              + Add Skill
            </button>
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Loading skills...</p>
      ) : skills.length > 0 ? (
        <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="skill-card relative p-4 border rounded-lg"
            >
              {/* Edit and Delete buttons on the top-right */}
              <div className="absolute top-1 right-1 flex gap-2">
                <button
                  onClick={() => handleEditSkill(skill._id)} // Navigating to edit skill page
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteSkill(skill._id)} // Deleting the skill
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Display skill information */}
              <h4 className="font-semibold text-blue-500">{skill.name}</h4>
              <p className="text-gray-600">{skill.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No skills added yet.</p>
      )}
    </div>
  );
};

export default ProfileSkills;
