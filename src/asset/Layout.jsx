import React, { forwardRef } from 'react';

const FadeWrapper = forwardRef((props, ref) => {
  const { children, className } = props;
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
});

export default FadeWrapper;