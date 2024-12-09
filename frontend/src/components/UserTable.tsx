import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

interface User {
  _id: string;
  name: string;
  email: string;
  address?: string;
  coordinates?: [number, number];
}

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Endereço</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onEdit(user)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: "0.5rem" }}
                onClick={() => onDelete(user._id)}
              >
                Excluir
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default UserTable;
