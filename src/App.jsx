import { useState } from "react";

function App() {
  const initialValues = { username:"", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(
    JSON.parse(localStorage.getItem("data")) ? true : false
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 8) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };
  const logout = () => {
    setIsSubmit(false);
    localStorage.clear();
  };



  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <>
         {localStorage.setItem("data", JSON.stringify(formValues))}
          <div>
            hello {JSON.parse(localStorage.getItem("data")).username} ,Signed
            in successfully
          </div>
          <button onClick={logout}>LOG OUT</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.username}</p>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.password}</p>
            <button>Submit</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default App;
