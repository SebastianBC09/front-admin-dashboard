import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FeatureCard from '@/components/FeatureCard';
import Hero from '@/components/Hero';
import { Category as CategoryIcon, FormatListBulleted as ListIcon, Security as SecurityIcon } from '@mui/icons-material';
import Wrapper from '@/components/Wrapper';

export default function HomePage() {
  return (
    <Wrapper>
      <Box>
        <Hero />
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
    </Wrapper>
  );
}
