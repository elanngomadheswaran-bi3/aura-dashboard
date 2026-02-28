interface LogoBoxProps {
  logoSrc?: string;
  clientName: string;
}

export default function LogoBox({ logoSrc, clientName }: LogoBoxProps) {
  if (!logoSrc) return null;

  return (
    <div className="bg-light-grey/20 p-10 rounded-xl h-30 flex justify-center items-center mb-4">
      <img src={logoSrc} alt={clientName} className="h-20" />
    </div>
  );
}
