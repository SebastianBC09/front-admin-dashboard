'use client'
import { Card, CardHeader, CardContent, CardActions, Typography, Button, Divider } from '@mui/material';
import Link from 'next/link';
import { useHeader } from '@/hooks/useHeader';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  authLink: string;
  loggedLink?: string;
  authButtonText?: string;
  authButtonDisabledText?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  authLink,
  loggedLink,
  authButtonText = "Iniciar sesión para acceder",
  authButtonDisabledText = "Sesión iniciada",
}) => {
  const { isAuthenticated } = useHeader();

  let actionButton = null;
  if (isAuthenticated) {
    if (loggedLink) {
      actionButton = (
        <Button size="small" component={Link} href={loggedLink}>
          Ir al Panel
        </Button>
      );
    } else {
      actionButton = (
        <Button size="small" disabled>
          {authButtonDisabledText}
        </Button>
      );
    }
  } else {
    actionButton = (
      <Button size="small" component={Link} href={authLink}>
        {authButtonText}
      </Button>
    );
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardHeader
        avatar={icon}
        title={
          <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        }
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography>{description}</Typography>
      </CardContent>
      <Divider />
      <CardActions>{actionButton}</CardActions>
    </Card>
  );
};

export default FeatureCard;
