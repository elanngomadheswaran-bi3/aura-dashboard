interface SubHeaderProps {
  title: string;
  description: string;
}

export default function SubHeader({ title, description }: SubHeaderProps) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h2 className="text-4xl font-bold text-center p-3">{title}</h2>
      <p className="text-white text-lg text-center">{description}</p>
    </div>
  );
}
