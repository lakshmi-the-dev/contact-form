import { useEffect, useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  //const data=localStorage.getItem("name")
  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form Validation
  const validate = () => {
    const newErrors = {};

    // Name Validation
    if (!formData.name) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only letters.";
    }

    // Email Validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const savedData = JSON.parse(localStorage.getItem("contactData")) || [];
      const updateData = [...savedData, formData];
      localStorage.setItem("contactData", JSON.stringify(updateData));
      alert("Form Submitted Successfully!");
      setFormData({ name: "", email: "" }); // Clear form
      setErrors({});
    }
  };
  useEffect(() => {
    const newData = JSON.parse(localStorage.getItem("contactData"));

    setData(newData);
  }, []);
  console.log(data);
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Contact</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <button type="add" className="btn btn-primary w-100">
          Add
        </button>
      </form>
      <ul className="list-group">
        {data.map((contact) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-left p-3"
            key={contact.name}
          >
            <div className="d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                fill="grey"
                className="bi bi-person-circle me-3"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              <div className="ms-3">
                <p className="fs-6">{contact.name}</p>
                <p className="fs-6">{contact.email}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactForm;
