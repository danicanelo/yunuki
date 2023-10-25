import React from "react";
import { Input } from "../../core/components/input";

export function Register() {
  const [values, setValues] = React.useState({
    user: "",
    email: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleChange(evt) {
    const { target } = evt;
    const { name, value } = target;
    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
  }

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>    
        <Input 
          label = "Nombre"
          id = "user"
          type = "text"
          value = {values.user}
          onChange = {handleChange}
        />
        <Input 
          label = "Email"
          id = "email"
          type = "email"
          value = {values.user}
          onChange = {handleChange}
        />
        <Input 
          label = "Password"
          id = "password"
          type = "password"
          value = {values.user}
          onChange = {handleChange}
        />
        <button className="is-block button is-info" type="submit">Sign Up</button>
      </form>
    </div>

  );
}