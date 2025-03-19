'use client'
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
  InputAdornment,
  Alert,
  Snackbar,
  Zoom,
  Tooltip,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import ConfirmationDialog from './ConfirmationDialog';
import TypeForm from './TypeForm';
import Wrapper from './Wrapper';
import { useTiposActions } from '@/hooks/useTiposActions';
import { useTipos } from '@/hooks/useTipos';
import { TypeData } from '@/interfaces/types';


const TiposClient: React.FC = () => {
  const {
    tipos,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    refetch,
    total,
  } = useTipos();

  const {
    openForm,
    handleOpenForm,
    handleCloseForm,
    notification,
    handleCloseNotification,
    requestDelete,
    confirmDialogOpen,
    confirmDelete,
    cancelDelete,
  } = useTiposActions();


  return (
    <Wrapper maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CategoryIcon sx={{ fontSize: 28, mr: 1, color: 'primary.main' }} />
          <Typography variant="h4" component="h1" fontWeight={500}>
            Tipos
          </Typography>
        </Box>
        <Tooltip title="Añadir nuevo tipo">
          <IconButton color="primary" onClick={handleOpenForm}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Paper sx={{ mb: 3, p: 2, borderRadius: 2 }}>
        <TextField
          fullWidth
          placeholder="Buscar tipos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </Paper>
      <Zoom in timeout={500}>
        <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Descripción</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Propiedades</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading
                  ? Array.from(new Array(5)).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body2">Cargando...</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">Cargando...</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">Cargando...</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">Cargando...</Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  : tipos.length > 0
                  ? tipos.map((tipo: TypeData) => (
                      <TableRow key={tipo.id} hover>
                        <TableCell sx={{ fontWeight: 500 }}>{tipo.name}</TableCell>
                        <TableCell>{tipo.description}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {tipo.properties.length > 0 ? (
                              tipo.properties.map((prop) => (
                                <Typography key={prop.propertyId} variant="body2" color="text.secondary">
                                  {prop.propertyId}
                                </Typography>
                              ))
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                Sin propiedades
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Editar">
                            <IconButton color="primary">
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar">
                            <IconButton onClick={() => requestDelete(tipo.id)} color="error">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          No se encontraron tipos
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        </Paper>
      </Zoom>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
      <TypeForm open={openForm} onClose={handleCloseForm} onSuccess={refetch} />
      <ConfirmationDialog
        open={confirmDialogOpen}
        title="Confirmar eliminación"
        message="¿Está seguro de que desea eliminar este tipo?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </Wrapper>
  );
};

export default TiposClient;
