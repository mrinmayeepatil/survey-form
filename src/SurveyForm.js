import React, { useState, useEffect } from 'react';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.fullName) errors.fullName = 'Full Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.surveyTopic) errors.surveyTopic = 'Survey Topic is required';
    if (formData.surveyTopic === 'Technology') {
      if (!formData.favoriteProgrammingLanguage) errors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
      if (!formData.yearsOfExperience) {
        errors.yearsOfExperience = 'Years of Experience is required';
      } else if (isNaN(formData.yearsOfExperience) || formData.yearsOfExperience <= 0) {
        errors.yearsOfExperience = 'Years of Experience must be a number greater than 0';
      }
    }
    if (formData.surveyTopic === 'Health') {
      if (!formData.exerciseFrequency) errors.exerciseFrequency = 'Exercise Frequency is required';
      if (!formData.dietPreference) errors.dietPreference = 'Diet Preference is required';
    }
    if (formData.surveyTopic === 'Education') {
      if (!formData.highestQualification) errors.highestQualification = 'Highest Qualification is required';
      if (!formData.fieldOfStudy) errors.fieldOfStudy = 'Field of Study is required';
    }
    if (!formData.feedback) {
      errors.feedback = 'Feedback is required';
    } else if (formData.feedback.length < 50) {
      errors.feedback = 'Feedback must be at least 50 characters';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(`https://api.example.com/survey/${formData.surveyTopic}`);
        const data = await response.json();
        setAdditionalQuestions(data.questions);
        setSubmitted(true);
      } catch (error) {
        console.error('Error fetching additional questions:', error);
      }
    } else {
      setErrors(validationErrors);
      setSubmitted(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Full Name:
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          </label>
          {errors.fullName && <p>{errors.fullName}</p>}
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>
            Survey Topic:
            <select name="surveyTopic" value={formData.surveyTopic} onChange={handleChange}>
              <option value="">Select Topic</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
          </label>
          {errors.surveyTopic && <p>{errors.surveyTopic}</p>}
        </div>
        {formData.surveyTopic === 'Technology' && (
          <div>
            <div>
              <label>
                Favorite Programming Language:
                <select name="favoriteProgrammingLanguage" value={formData.favoriteProgrammingLanguage} onChange={handleChange}>
                  <option value="">Select Language</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
              </label>
              {errors.favoriteProgrammingLanguage && <p>{errors.favoriteProgrammingLanguage}</p>}
            </div>
            <div>
              <label>
                Years of Experience:
                <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} />
              </label>
              {errors.yearsOfExperience && <p>{errors.yearsOfExperience}</p>}
            </div>
          </div>
        )}
        {formData.surveyTopic === 'Health' && (
          <div>
            <div>
              <label>
                Exercise Frequency:
                <select name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange}>
                  <option value="">Select Frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Rarely">Rarely</option>
                </select>
              </label>
              {errors.exerciseFrequency && <p>{errors.exerciseFrequency}</p>}
            </div>
            <div>
              <label>
                Diet Preference:
                <select name="dietPreference" value={formData.dietPreference} onChange={handleChange}>
                  <option value="">Select Diet</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
              </label>
              {errors.dietPreference && <p>{errors.dietPreference}</p>}
            </div>
          </div>
        )}
        {formData.surveyTopic === 'Education' && (
          <div>
            <div>
              <label>
                Highest Qualification:
                <select name="highestQualification" value={formData.highestQualification} onChange={handleChange}>
                  <option value="">Select Qualification</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
              </label>
              {errors.highestQualification && <p>{errors.highestQualification}</p>}
            </div>
            <div>
              <label>
                Field of Study:
                <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} />
              </label>
              {errors.fieldOfStudy && <p>{errors.fieldOfStudy}</p>}
            </div>
          </div>
        )}
        <div>
          <label>
            Feedback:
            <textarea name="feedback" value={formData.feedback} onChange={handleChange} />
          </label>
          {errors.feedback && <p>{errors.feedback}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div>
          <h2>Form Submission Summary:</h2>
          <p>Full Name: {formData.fullName}</p>
          <p>Email: {formData.email}</p>
          <p>Survey Topic: {formData.surveyTopic}</p>
          {formData.surveyTopic === 'Technology' && (
            <>
              <p>Favorite Programming Language: {formData.favoriteProgrammingLanguage}</p>
              <p>Years of Experience: {formData.yearsOfExperience}</p>
            </>
          )}
          {formData.surveyTopic === 'Health' && (
            <>
              <p>Exercise Frequency: {formData.exerciseFrequency}</p>
              <p>Diet Preference: {formData.dietPreference}</p>
            </>
          )}
          {formData.surveyTopic === 'Education' && (
            <>
              <p>Highest Qualification: {formData.highestQualification}</p>
              <p>Field of Study: {formData.fieldOfStudy}</p>
            </>
          )}
          <p>Feedback: {formData.feedback}</p>
          {additionalQuestions.length > 0 && (
            <div>
              <h3>Additional Questions:</h3>
              {additionalQuestions.map((question, index) => (
                <p key={index}>{question}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
