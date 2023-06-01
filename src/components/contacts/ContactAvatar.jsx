import React from 'react';

const ContactAvatar = ({ firstName }) => {
  // Extract the first character from the first name
  const initial = firstName.charAt(0).toUpperCase();

  // Generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Apply random color to the background or text color
  const randomColor = getRandomColor();
  const style = {
    backgroundColor: randomColor,
    color: 'white', // You can adjust the text color based on the background color for better contrast
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '100px',
  };

  return <div style={style}>{initial}</div>;
};

export default ContactAvatar;