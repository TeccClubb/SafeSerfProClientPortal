import React from "react";

type ErrorIconProps = {
  size?: number;
  width?: number;
  height?: number;
  [key: string]: any;
};

const ErrorIcon = ({ size = 24, width, height, ...props }: ErrorIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || width}
    height={size || height}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.91 3.23L3.23 7.913v-.01a.8.8 0 0 0-.23.57v7.054c0 .22.08.42.23.57L7.9 20.77c.15.15.36.23.57.23h7.06c.22 0 .42-.08.57-.23l4.67-4.673a.8.8 0 0 0 .23-.57V8.473c0-.22-.08-.42-.23-.57L16.1 3.23a.8.8 0 0 0-.57-.23H8.48c-.22 0-.42.08-.57.23M12 7a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1m-1 9a1 1 0 0 1 1-1h.008a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
);

export default ErrorIcon;
