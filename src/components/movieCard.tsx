import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface MovieCardProps {
  imageUrl: string;
  title: string;
  year: string | number;
}

const MovieCard: React.FC<MovieCardProps> = ({ imageUrl, title, year }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', backgroundColor: '#092C39', borderRadius: '8px' }}>
      <CardMedia
        component='img'
        height='280'
        image={imageUrl}
        alt={title}
        sx={{ objectFit: 'cover', borderRadius: '8px' }}
      />
      <CardContent>
        <Typography variant='body2' sx={{ color: 'white' }}>
          {title}
        </Typography>
        <Typography variant='caption' color='textSecondary'>
          {year}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
