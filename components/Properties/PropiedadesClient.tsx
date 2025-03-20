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
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  ListAlt as ListAltIcon,
} from '@mui/icons-material';
import ConfirmationDialog from '../UI/ConfirmationDialog';
import PropertiesForm from './PropertiesForm';
import Wrapper from '../layout/Wrapper';
import { usePropiedadesActions } from '@/hooks/Properties/usePropiedadesActions';
import { usePropiedades } from '@/hooks/Properties/usePropiedades';
import { PropertyData } from '@/interfaces/types';
import { useAuthStore } from '@/store/useAuthStore';

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString();
};

const PropiedadesClient: React.FC = () => {
  const {
    propiedades,
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
  } = usePropiedades();

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
  } = usePropiedadesActions();
  const { user } = useAuthStore();

  return (
    <Wrapper maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ListAltIcon sx={{ fontSize: 28, mr: 1, color: 'primary.main' }} />
          <Typography variant="h4" component="h1" fontWeight={500}>
            Propiedades
          </Typography>
        </Box>
        {user?.role === 'ADMIN' && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenForm}
            sx={{
              borderRadius: '8px',
              boxShadow: 2,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            }}
          >
            Nueva Propiedad
          </Button>
        )}
      </Box>
      <Paper sx={{ mb: 3, p: 2, borderRadius: 2 }}>
        <TextField
          fullWidth
          placeholder="Buscar propiedades..."
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
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Zoom in timeout={500}>
        <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tipo</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Creación</TableCell>
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
                  : propiedades.length > 0
                  ? propiedades.map((propiedad: PropertyData) => (
                      <TableRow key={propiedad.id} hover>
                        <TableCell sx={{ fontWeight: 500 }}>{propiedad.name}</TableCell>
                        <TableCell>{propiedad.type}</TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(propiedad.createdAt)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          {user?.role === 'ADMIN' ? (
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                              <Tooltip title="Editar">
                                <IconButton color="primary">
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Eliminar">
                                <IconButton onClick={() => requestDelete(propiedad.id)} color="error">
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          ) : (
                            <Typography variant="body2" color="text.secondary">Solo lectura</Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  : (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          No se encontraron propiedades
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
      <PropertiesForm open={openForm} onClose={handleCloseForm} onSuccess={refetch} />
      <ConfirmationDialog
        open={confirmDialogOpen}
        title="Confirmar eliminación"
        message="¿Está seguro de que desea eliminar esta propiedad?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </Wrapper>
  );
};

export default PropiedadesClient;
