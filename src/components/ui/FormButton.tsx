interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string; // ✅ for custom styling
}

export default function FormButton({ label, className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={
        "px-6 py-2 bg-black text-white rounded hover:bg-gray-800 " + className
      }
    >
      {label}
    </button>
  );
}
