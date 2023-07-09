import "./styles.css";
import react, { useState } from "react";
import "./App.css";
export default function App() {
  const initialState = {
    email: "",
    name: "",
    message: "",
    language: "",
    gender: "",
    license: false
  };
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState(initialState);
  const handleFormInput = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const validateFormInput = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    if (!newValue && newValue?.trim()) {
      setErrors({ ...errors, [name]: `${name} is required` });
    } else {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent the form to refresh
    e.stopPropagation();
    const formErrors = {};
    if (!formData.email) {
      formErrors.email = "Email is required";
    }
    if (!formData.name) {
      formErrors.name = "name is required.";
    }
    if (!formData.message) {
      formErrors.message = "message is required.";
    }
    if (!formData.language) {
      formErrors.language = "language is required.";
    }
    if (!formData.gender) {
      formErrors.gender = "gender is required.";
    }
    if (!formData.license) {
      formErrors.license = "licence agreement is required.";
    }
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0) {
      console.log(formData);
      window.alert(JSON.stringify(formData, null, 2));
      resetForm();
    } else {
      setErrors(formErrors);
    }
  };
  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return (
    <div className="app">
      <form
        className="container"
        autoComplete="off"
        method="post"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="form-field">
          <label className="label" htmlFor="email">
            Email:
          </label>
          <div className="input">
            <input
              className="input"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormInput}
              onBlur={validateFormInput}
            />
          </div>
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="form-field">
          <label className="label" htmlFor="name">
            Name:
          </label>
          <input
            className="input"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleFormInput}
            onBlur={validateFormInput}
          ></input>
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="form-field">
          <label className="label" htmlFor="message">
            Message:
          </label>
          <textarea
            className="input"
            id="message"
            name="message"
            required
            onChange={handleFormInput}
            onBlur={validateFormInput}
            value={formData.message}
            rows={4}
            cols={40}
          ></textarea>
          {errors.message && <div className="error">{errors.message}</div>}
        </div>

        <div className="form-field">
          <label className="label" htmlFor="language">
            Languages:
          </label>
          <select
            id="language"
            required
            name="language"
            className="input"
            value={formData.language}
            onChange={handleFormInput}
            onBlur={validateFormInput}
          >
            <option value="">-- Select --</option>
            <option value="English">English</option>
            <option value="French">French</option>
          </select>
          {errors.language && <div className="error">{errors.language}</div>}
        </div>

        <div className="form-field">
          <div className="label">
            <label>Gender: </label>
          </div>
          <div className="input radio-button-group">
            <div className="radio-button">
              <label htmlFor="male">male</label>
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleFormInput}
              />
            </div>
            <div>
              <label htmlFor="female">female</label>
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleFormInput}
              />
            </div>
          </div>
          {errors.gender && <div className="error">{errors.gender}</div>}
        </div>
        <div className="form-field">
          <label htmlFor="license">License agreement:</label>
          <div className="input">
            <input
              type="checkbox"
              id="license"
              name="license"
              value={formData.license}
              checked={formData.license}
              onChange={handleFormInput}
              onBlur={validateFormInput}
            />
            I agree the license
          </div>
          {errors.license && <div className="error">{errors.license}</div>}
        </div>
        <div className="button-group">
          <button
            className="button submit"
            type="submit"
            name="submit"
            aria-label="submit the form"
          >
            Submit
          </button>
          <button
            className="button reset"
            type="button"
            aria-label="reset the form"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
