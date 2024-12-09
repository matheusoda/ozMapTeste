import { useState, ChangeEvent, FormEvent } from "react";
import { createUser, CreateUserPayload } from "../services/userService";

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateUserPayload>({
    name: "",
    email: "",
    password: "",
    address: "",
    coordinates: undefined,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    if (name === "coordinates") {
      const coords = value.split(",").map(Number) as [number, number];
      setFormData((prev) => ({ ...prev, coordinates: coords }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createUser(formData);
      alert("User created successfully!");
      console.log(result);
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <input
        name="coordinates"
        placeholder="Coordinates (e.g., -122.4194,37.7749)"
        onChange={handleChange}
      />
      <button type="submit">Create User</button>
    </form>
  );
};

export default UserForm;
