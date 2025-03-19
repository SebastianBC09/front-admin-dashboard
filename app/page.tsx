import { Typography, Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AuthButtons from '@/components/AuthButtons';
import FeatureCard from '@/components/FeatureCard';
import { Category as CategoryIcon, FormatListBulleted as ListIcon, Security as SecurityIcon } from '@mui/icons-material';

export default function HomePage() {
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 6,
          mb: 4,
          borderRadius: 3,
          backgroundImage: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Bienvenido a Fortex
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              maxWidth: 600,
              opacity: 0.9,
            }}
          >
            Plataforma integral para la administración de tipos y propiedades con una interfaz intuitiva y potentes herramientas de gestión.
          </Typography>
            <AuthButtons />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            right: -50,
            bottom: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            right: 100,
            top: -30,
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            zIndex: 1,
          }}
        />
      </Paper>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 600,
          mb: 4,
          mt: 8,
        }}
      >
        Características Principales
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{xs: 12, md:4}}>
          <FeatureCard
            title="Gestión de Tipos"
            description="Crea, edita y elimina diferentes tipos de entidades para adaptarse a tus necesidades organizativas."
            icon={<CategoryIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
            authLink="/login"
            loggedLink="/tipos"
          />
        </Grid>
        <Grid size={{xs: 12, md:4}}>
          <FeatureCard
            title="Control de Propiedades"
            description="Administra propiedades personalizadas y asígnalas a diferentes tipos mediante un intuitivo sistema de multiselección."
            icon={<ListIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
            authLink="/login"
            loggedLink="/propiedades"
          />
        </Grid>
        <Grid size={{xs: 12, md:4}}>
          <FeatureCard
            title="Autenticación Segura"
            description="Sistema de autenticación JWT con roles de usuario para garantizar un acceso seguro y controlado a las funcionalidades."
            icon={<SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
            authLink="/register"
            authButtonText="Crear una cuenta"
            authButtonDisabledText="Sesión iniciada"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
