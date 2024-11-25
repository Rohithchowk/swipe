import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
import DomainAddIcon from '@mui/icons-material/DomainAdd';

// Custom styles for testimonial card with fixed width
const CardWrapper = styled(Box)(({ theme, isOrange }) => ({
  backgroundColor: isOrange ? '#ffa952' : theme.palette.primary.dark, // Orange color for some cards
  color: isOrange ? '#fff' : theme.palette.primary.light, // White text for orange cards
  overflow: 'hidden',
  position: 'relative',
  padding: '16px',
  borderRadius: '12px',
  width: '300px', // Fixed width for all cards
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  }
}));

const testimonialData = [
  { name: 'Ravi Kumar', company: 'Ananya Apparel', text: 'Swipe has revolutionized the way I send invoices. My customers love it!' },
  { name: 'Priya Shah', company: 'Priya\'s Bakery', text: 'Swipe makes invoicing and payment so much easier. Great for small businesses!' },
  { name: 'Vikas Patel', company: 'Patel Electronics', text: 'The instant payment feature via WhatsApp is a lifesaver for my business!' },
  { name: 'Neha Verma', company: 'Neha\'s Fashion Boutique', text: 'I love how fast and simple Swipe is for managing invoices and payments!' },
  { name: 'Arvind Singh', company: 'Singh\'s Tailoring', text: 'Swipe makes billing so easy. I get paid faster than ever before!' },
  { name: 'Geeta Sharma', company: 'Geeta\'s Bookstore', text: 'A great tool for small businesses. Highly recommend Swipe for invoicing and payments!' },
];

const TestimonialCard = ({ testimonial, isLoading, isOrange }) => {
  const theme = useTheme();

  return (
    <CardWrapper isOrange={isOrange}>
      {isLoading ? (
        <Box sx={{ height: 100, backgroundColor: '#ccc', borderRadius: '8px' }} />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.largeAvatar,
              backgroundColor: isOrange ? '#fff' : theme.palette.primary[800], // Orange background for orange card
              color: isOrange ? '#FF8C00' : '#fff', // Text color for orange card
            }}
          >
            <DomainAddIcon fontSize="inherit" />
          </Avatar>
          <Typography variant="h6" sx={{ color: isOrange ? '#fff' : '#fff', mt: 2 }}>
            {testimonial.name}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: isOrange ? '#fff' : theme.palette.primary.light, textAlign: 'center', mt: 1 }}>
            {testimonial.company}
          </Typography>
          <Typography variant="body2" sx={{ color: isOrange ? '#fff' : '#fff', textAlign: 'center', mt: 1 }}>
            {testimonial.text}
          </Typography>
        </Box>
      )}
    </CardWrapper>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool,
  isOrange: PropTypes.bool, // Prop to conditionally apply orange color
};

const Testimonials = ({ testimonials = testimonialData, isLoading = false }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
    {/* Title Header */}
    <Typography
      variant="h4"
      sx={{
        mb: 3,
        fontSize:'36px',
        fontWeight: 'bold',
        textAlign: 'center',  
        letterSpacing: '1px',  
        color: '#333',  
        textTransform: 'uppercase',  
        fontFamily: '"Roboto", sans-serif',  
        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',  
      }}
    >
      Testimonials
    </Typography>

    {/* Testimonials Cards */}
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {testimonials.length > 0 ? (
        testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            isLoading={isLoading}
            isOrange={index % 2 === 0} // Apply orange color for alternate cards
          />
        ))
      ) : (
        <Typography>No testimonials available.</Typography>
      )}
    </Box>
  </Box>
);

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  isLoading: PropTypes.bool,
};

export default Testimonials;
