import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button } from '@mui/material';
import './ScrollButton.css';
import theme from '../../theme/theme';

export default function ScrollButton({ direction, divContainer }) {
  const elementScroll = document.querySelector(`.${divContainer}`);

  function handleClick() {
    direction === 'left'
      ? (elementScroll.scrollLeft -= 600)
      : (elementScroll.scrollLeft += 600);
  }

  return (
    <Button
      onClick={() => handleClick(direction)}
      className='scroll-button'
      theme={theme}>
      {direction === 'left' ? (
        <ChevronLeftIcon sx={{ fontSize: 80 }} />
      ) : (
        <ChevronRightIcon sx={{ fontSize: 80 }} />
      )}
    </Button>
  );
}
