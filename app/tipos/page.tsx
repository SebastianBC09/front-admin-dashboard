'use client'
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
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
  Fade,
  Zoom,
  Tooltip,
  TextField
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import api from '../../services/api';
import TypeForm from '../../components/TypeForm';

interface Tipo {
  id: number;
  nombre: string;
  descripcion: string;
  propiedades: Array<{
    id: number;
    nombre: string;
  }>;
}

const TiposPage: React.FC = () => {
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    fetchTipos();
    setPageLoaded(true);
  }, []);

  const fetchTipos = async () => {
    setLoading(true);
    try {
      const response = await api.get('/types');
      // Asumimos que la respuesta contiene un array en response.data.types
      setTipos(response.data.types);
    } catch (error: any) {
      console.error('Error al cargar los tipos:', error);
      setNotification({
        open: true,
        message: 'Error al cargar los tipos. Inténtelo de nuevo.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar este tipo?')) {
      try {
        await api.delete(`/types/${id}`);
        fetchTipos();
        setNotification({
          open: true,
          message: 'Tipo eliminado correctamente',
          severity: 'success'
        });
      } catch (error: any) {
        console.error('Error al eliminar el tipo:', error);
        setNotification({
          open: true,
          message: 'Error al eliminar el tipo. Inténtelo de nuevo.',
          severity: 'error'
        });
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredTipos = tipos.filter(tipo =>
    tipo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tipo.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedTipos = filteredTipos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Fade in={pageLoaded} timeout={800}>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CategoryIcon sx={{ fontSize: 28, mr: 1, color: 'primary.main' }} />
            <Typography variant="h4" component="h1" fontWeight={500}>
              Tipos
            </Typography>
          </Box>
          <Tooltip title="Añadir nuevo tipo">
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog} sx={{ boxShadow: 2 }}>
              Nuevo Tipo
            </Button>
          </Tooltip>
        </Box>

        <Paper sx={{ mb: 3, p: 2, borderRadius: 2 }}>
          <TextField
            fullWidth
            placeholder="Buscar tipos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Paper>

        <Zoom in={pageLoaded} timeout={500}>
          <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Descripción</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Propiedades</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    Array.from(new Array(5)).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell><Typography variant="body2">Cargando...</Typography></TableCell>
                        <TableCell><Typography variant="body2">Cargando...</Typography></TableCell>
                        <TableCell><Typography variant="body2">Cargando...</Typography></TableCell>
                        <TableCell align="right"><Typography variant="body2">Cargando...</Typography></TableCell>
                      </TableRow>
                    ))
                  ) : paginatedTipos.length > 0 ? (
                    paginatedTipos.map((tipo) => (
                      <TableRow key={tipo.id} hover>
                        <TableCell sx={{ fontWeight: 500 }}>{tipo.nombre}</TableCell>
                        <TableCell>{tipo.descripcion}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {tipo.propiedades?.length > 0 ? (
                              tipo.propiedades.map((propiedad) => (
                                <Typography key={propiedad.id} variant="body2" color="text.secondary">
                                  {propiedad.nombre}
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
                            <IconButton /* Se puede implementar la edición si se desea */ color="primary">
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar">
                            <IconButton onClick={() => handleDelete(tipo.id)} color="error">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
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
              count={filteredTipos.length}
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

        {/* Integración del TypeForm en modo Drawer sin alterar el estilo visual */}
        <TypeForm
          open={openDialog}
          onClose={handleCloseDialog}
          onSuccess={fetchTipos}
        />
      </Container>
    </Fade>
  );
};

export default TiposPage;
