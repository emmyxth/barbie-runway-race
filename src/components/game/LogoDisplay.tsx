interface LogoDisplayProps {
  logo: string | null;
}

export const LogoDisplay = ({ logo }: LogoDisplayProps) => {
  if (!logo) return null;
  
  return (
    <div className="absolute top-4 right-4 z-10">
      <img src={logo} alt="Logo" className="h-16 object-contain drop-shadow-lg" />
    </div>
  );
};

