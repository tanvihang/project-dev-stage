export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="playground-layout min-h-screen bg-background-primary">
      {children}
    </div>
  );
}
