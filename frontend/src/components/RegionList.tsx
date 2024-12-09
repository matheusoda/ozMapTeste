import React, { useState, useEffect } from "react";
import { getRegions, deleteRegion } from "../services/regionService";
import { Container, Button,  Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RegionForm from "./RegionForm";

interface Region {
    _id: string;
    name: string;
    user: string;
  }

const RegionList: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<Region | null >(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const data = await getRegions();
      setRegions(data);
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  const handleDeleteRegion = async (id: string) => {
    try {
      await deleteRegion(id);
      fetchRegions();
    } catch (error) {
      console.error("Error deleting region:", error);
    }
  };

  const handleEditRegion = (region: Region) => {
    setSelectedRegion(region);
    setModalOpen(true);
  };

  const handleSaveRegion = () => {
    fetchRegions();
    setModalOpen(false);
    setSelectedRegion(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Regiões
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
        Nova Região
      </Button>
      <List>
        {Array.isArray(regions) && regions.map((region) => (
          <ListItem key={region._id}>
            <ListItemText primary={region.name} secondary={`Usuário: ${region.user}`} />
            <IconButton onClick={() => handleEditRegion(region)}>
              Editar
            </IconButton>
            <IconButton onClick={() => handleDeleteRegion(region._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      {modalOpen && (
        <RegionForm region={selectedRegion} onSave={handleSaveRegion} />
      )}
    </Container>
  );
};

export default RegionList;
