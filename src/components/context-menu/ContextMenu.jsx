import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * ContextMenu component that wraps any div and displays a right-click menu.
 */
export const ContextMenu = ({ children, menu }) => {
  const [visible, setVisible] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  const handleRightClick = (e) => {
    e.preventDefault();
    setCoordinates({ x: e.clientX, y: e.clientY });
    setVisible(true);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div onContextMenu={handleRightClick} className="relative inline-block">
      {children}

      {visible && (
        <div
          ref={menuRef}
          className="absolute z-50 bg-base-300 shadow-lg"
          style={{ top: `${coordinates.y}px`, left: `${coordinates.x}px` }}
        >
          {React.cloneElement(menu, { closeMenu: () => setVisible(false) })}
        </div>
      )}
    </div>
  );
};

ContextMenu.propTypes = {
  children: PropTypes.node.isRequired,
  menu: PropTypes.element.isRequired, // Accepts a React element as the menu
};

export default ContextMenu;
