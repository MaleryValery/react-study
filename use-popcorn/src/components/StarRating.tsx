import { Dispatch, SetStateAction, useState } from 'react';
import Star from './Star';

const boxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const starsBox = {
  display: 'flex',
};

const textStyle = {
  lineHeight: '1',
  margin: '0',
  color: 'red',
};

type StarRatingProp = {
  maxRating?: number;
  color?: string;
  size?: number;
  defaultRating?: number;
  onSetRating: Dispatch<SetStateAction<number>>;
};

function StarRating({
  maxRating = 10,
  color = '#fcc419',
  size = 24,
  defaultRating = 0,
  onSetRating,
}: StarRatingProp) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (curRating: number) => {
    setRating(curRating);
    onSetRating(curRating);
  };

  const handlerMouseEnter = (newRating: number) => {
    setTempRating(newRating);
  };

  const handlerMouseLeave = () => {
    setTempRating(0);
  };

  return (
    <div style={boxStyle}>
      <div style={starsBox}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            color={color}
            size={size}
            onHoverIn={() => handlerMouseEnter(i + 1)}
            onHoverOut={handlerMouseLeave}
            key={i}
            onClick={() => handleRating(i + 1)}
            isFull={tempRating ? tempRating >= i + 1 : rating >= i + 1}
          />
        ))}
      </div>
      <p style={{ ...textStyle, fontSize: `${size / 2}px`, color }}>
        {tempRating || (rating ?? '')}
      </p>
    </div>
  );
}

StarRating.defaultProps = {
  maxRating: 10,
  color: '#fcc419',
  size: 24,
  defaultRating: 0,
};

export default StarRating;
