import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: { _id?: string; name: string; email: string }) => void;
  user?: { _id: string; name: string; email: string, address?: string, coordinates?: [number, number]  } | null;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, onSave, user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState<string | undefined>("");
  const [coordinates, setCoordinates] = useState<[number, number] | undefined>(undefined);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAddress(user.address);
      setCoordinates(user.coordinates);
    } else {
      setName("");
      setEmail("");
      setAddress("");
      setCoordinates(undefined);
    }
  }, [user]);

  const handleSubmit = () => {
    onSave({ _id: user?._id, name, email });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" mb={2}>
          {user ? "Editar Usuário" : "Criar Usuário"}
        </Typography>
        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={!!coordinates}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Coordenadas (latitude, longitude)"
          value={coordinates?.join(", ")}
          onChange={(e) => {
            const [lat, long] = e.target.value.split(",").map((v) => parseFloat(v.trim()));
            if (!isNaN(lat) && !isNaN(long)) {
                setCoordinates([lat, long]);
            }
        }}
          disabled={!!address}
          fullWidth
          margin="normal"
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} style={{ marginRight: "0.5rem" }}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserModal;
