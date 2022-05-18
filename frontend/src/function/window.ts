import React, { useState, useEffect } from "react";

export const useWindowDimensions = () => {
  const getWindowDimensions = () => {
    const { innerWidth: width } = window;
    return width;
  };

  const [width, setWidth] = useState(getWindowDimensions());
  useEffect(() => {
    const onResize = () => {
      setWidth(getWindowDimensions());
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
};
