import React, { useState, useEffect } from "react";
import { Container, Button, Pagination, TextField } from "@mui/material";
import UserTable from "./UserTable";
import UserModal from "./UserModal";
import { createUser, updateUser, deleteUser, getUsersList } from "../services/userService";

interface User {
  _id: string;
  name: string;
  email: string;
  address?: string;
  coordinates?: [number, number];
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    const response = await getUsersList(page, 10);
    setUsers(response.rows);
    setTotalPages(Math.ceil(response.total / 10));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSaveUser = async (user: { id?: string; name: string; email: string, address?: string, coordinates?: [number, number]  }) => {
    if (user.id) {
      await updateUser(user.id, user);
    } else {
      await createUser(user);
    }
    fetchUsers();
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
    fetchUsers();
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setEditingUser(null);
    setModalOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <h1>Usuários</h1>
      <TextField
        label="Pesquisar"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearch}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "1rem" }}
        onClick={handleOpenModal}
      >
        Novo Usuário
      </Button>
      <UserTable
        users={users.filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        )}
        onEdit={(user) => {
          setEditingUser(user);
          setModalOpen(true);
        }}
        onDelete={handleDeleteUser}
      />
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
        style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}
      />
      <UserModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        user={editingUser}
      />
    </Container>
  );
};

export default UserList;
