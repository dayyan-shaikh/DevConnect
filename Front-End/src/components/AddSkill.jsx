import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSkill = () => {
  const [skill, setSkill] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [editing, setEditing] = useState(false); // Track if we're editing a skill

  // Extract skillId from query params
  const queryParams = new URLSearchParams(location.search);
  const skillId = queryParams.get('edit'); // `edit` parameter contains the skillId
  
  useEffect(() => {
    if (skillId) {
      // Fetch skill data if editing
      console.log(skillId);
      
      const fetchSkill = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('No token found!');
            return;
          }
          
          const response = await axios.get(
            `http://localhost:5000/skill/${skillId}`,  // Use the skillId in the URL
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            setSkill(response.data.skill.name);
            setDescription(response.data.skill.description);
            setEditing(true); // Set editing mode to true
          } else {
            toast.error('Failed to fetch skill details');
          }
        } catch (error) {
          console.error('Error fetching skill:', error);
          toast.error('An error occurred while fetching the skill.');
        }
      };

      fetchSkill();
    }
  }, [skillId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token') || 'your-jwt-token-here';

    try {
      if (editing) {
        // Update the skill if editing
        const response = await axios.patch(
          `http://localhost:5000/skill/skills/${skillId}`, // URL with skillId
          { name: skill, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.success) {
          toast.success('Skill updated successfully!');
          setTimeout(() => navigate('/profile'), 1000);
        } else {
          toast.error('Failed to update skill');
        }
      } else {
        // Create new skill
        const response = await axios.post(
          'http://localhost:5000/skill/createSkill',
          { name: skill, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.success) {
          toast.success('Skill added successfully!');
          setTimeout(() => navigate('/profile'), 2000);
        } else {
          toast.error('Failed to add skill',{ autoClose: 2000 });
        }
      }
    } catch (error) {
      console.error('Error submitting skill:', error);
      toast.error('An error occurred while submitting the skill.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="formPage my-12 px-4">
        <div className="content-box bg-white p-8 shadow-lg rounded-lg max-w-lg mx-auto">
          <div className="formWrapper">
            <Link to="/profile" className="backButton text-blue-500 hover:underline flex items-center mb-4">
              <i className="im im-angle-left mr-2"></i> Back
            </Link>
            <form className="form" onSubmit={handleSubmit} id="skillForm">
              <div className="form__field mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Skill
                </label>
                <input
                  className="input input--text w-full border rounded px-4 py-2 focus:outline-blue-500"
                  id="name"
                  type="text"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="Enter skill name"
                  required
                />
              </div>

              <div className="form__field mb-4">
                <label htmlFor="description" className="block text-gray-700 mb-2">
                  Short Description
                </label>
                <textarea
                  className="input input--textarea w-full border rounded px-4 py-2 focus:outline-blue-500"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write something awesome..."
                ></textarea>
              </div>

              <button
                className="btn btn--sub btn--lg bg-gray-700 text-white px-6 py-3 rounded w-full hover:bg-gray-800 cursor-pointer"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Submitting...' : editing ? 'Update Skill' : 'Add Skill'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddSkill;
