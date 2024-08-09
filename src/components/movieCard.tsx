import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import NextLink from 'next/link';
import Link from '@mui/material/Link';

interface MovieCardProps {
  id: string;
  imageUrl: string;
  title: string;
  year: string | number;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, imageUrl, title, year }) => {
  return (
    <Link
      href={`/movies/${id}/edit`}
      component={NextLink}
      sx={{
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'none',
        },
      }}
    >
      <Card
        sx={{
          maxWidth: 345,
          margin: 'auto',
          backgroundColor: '#092C39',
          borderRadius: '8px',
        }}
      >
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
    </Link>
  );
};

export default MovieCard;
