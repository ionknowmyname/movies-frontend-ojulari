import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface MovieCardProps {
  imageUrl: string;
  title: string;
  year: string | number;
}

const MovieCard: React.FC<MovieCardProps> = ({ imageUrl, title, year }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto' }}>
      <CardMedia
        component='img'
        height='280'
        image={imageUrl}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant='h6' component='div' sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {year}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
