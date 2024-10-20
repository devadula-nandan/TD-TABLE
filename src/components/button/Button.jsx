import React from 'react';
import PropTypes from 'prop-types';

/**
 * Primary UI component for user interaction
 */
export const Button = ({ label, className = '', onClick = undefined, ...props }) => {
  return (
    <button
      type="button"
      className={`btn ${className}`} // Use template literals
      onClick={onClick} // Make sure to add onClick to handle click events
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Additional class names for DaisyUI styling
   */
  className: PropTypes.string,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

// Remove defaultProps as we're using default parameters
