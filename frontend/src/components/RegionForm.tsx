// import { useState, ChangeEvent, FormEvent } from "react";
// import { createRegion, CreateRegionPayload } from "../services/regionService";

// const RegionForm: React.FC = () => {
//   const [formData, setFormData] = useState<CreateRegionPayload>({
//     name: "",
//     user: "",
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const result = await createRegion(formData);
//       alert("Region created successfully!");
//       console.log(result);
//     } catch (error) {
//       console.error("Error creating region:", error);
//       alert("Failed to create region.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" placeholder="Region Name" onChange={handleChange} />
//       <input name="user" placeholder="User ID" onChange={handleChange} />
//       <button type="submit">Create Region</button>
//     </form>
//   );
// };

// export default RegionForm;


import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { TextField, Button, Container, Typography, Box, Snackbar, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { createRegion, updateRegion, CreateRegionPayload } from "../services/regionService";
import { getUsers } from "../services/userService";

interface RegionFormProps {
  region?: { _id: string; name: string; user: string } | null;
  onSave: (region: CreateRegionPayload) => void;
}

interface User {
  _id: string;
  name: string;
}

const RegionForm: React.FC<RegionFormProps> = ({ region, onSave }) => {
  const [formData, setFormData] = useState<CreateRegionPayload>({
    name: region?.name || "",
    user: region?.user || "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getUsers();
      setUsers(userList.rows);
    };
    fetchUsers();

    if (region) {
      setFormData({ name: region.name, user: region.user });
    }
  }, [region]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (region) {
        await updateRegion(region._id, formData);
      } else {
        await createRegion(formData);
      }
      onSave(formData);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ padding: 2, borderRadius: 1, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          {region ? "Editar Região" : "Criar Região"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nome da Região"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="user-select-label">Usuário</InputLabel>
            <Select
              labelId="user-select-label"
              name="user"
              value={formData.user}
              onChange={handleChange}
              variant="outlined"
            >
              {Array.isArray(users) && users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              {region ? "Atualizar Região" : "Criar Região"}
            </Button>
          </Box>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message="Operação realizada com sucesso!"
        />
      </Box>
    </Container>
  );
};

export default RegionForm;
