import { Box, Card, CardContent, Chip, Divider, IconButton, Typography } from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Apartment as ApartmentIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Place as PlaceIcon,
  Brightness1 as GenericIcon
} from '@mui/icons-material';
import { Property } from "@/interfaces/types";

const TypeIcon: React.FC<{ type: string }> = ({ type }) => {
  const lowerType = type.toLowerCase();

  if (lowerType.includes('person')) return <PersonIcon color="primary" />;
  if (lowerType.includes('organi')) return <ApartmentIcon color="secondary" />;
  if (lowerType.includes('event')) return <EventIcon style={{ color: '#ff9800' }} />;
  if (lowerType.includes('place') || lowerType.includes('lugar')) return <PlaceIcon style={{ color: '#4caf50' }} />;

  return <GenericIcon style={{ color: '#9c27b0' }} />;
};


const PropertyCard: React.FC<{ property: Property }> = ({ property }) => (
  <Card variant="outlined" sx={{
    height: '100%',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    }
  }}>
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        <TypeIcon type={property.type} />
        <Typography variant="h6" ml={1} fontWeight="500">
          {property.name}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Chip
          label={property.type}
          size="small"
          sx={{
            borderRadius: '4px',
            backgroundColor: property.type.toLowerCase().includes('person') ? '#bbdefb' :
              property.type.toLowerCase().includes('organi') ? '#f8bbd0' :
              property.type.toLowerCase().includes('event') ? '#ffe0b2' :
              property.type.toLowerCase().includes('place') ? '#c8e6c9' : '#e1bee7'
          }}
        />
        <Box>
          <IconButton size="small" color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default PropertyCard;
