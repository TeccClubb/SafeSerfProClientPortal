'use client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface ContinueButtonProps {
  label?: string;
  className?: string;
  redirectUrl?: string;
}

const ContinueButton: FC<ContinueButtonProps> = ({
  label = '+ Continue',
  className = '',
  redirectUrl = '/checkout', // Default to checkout page
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(redirectUrl);
  };

  return (
    <div className="flex justify-end mt-4">
      <button
        onClick={handleClick}
        className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition ${className}`}
      >
        {label}
      </button>
    </div>
  );
};

export default ContinueButton;
