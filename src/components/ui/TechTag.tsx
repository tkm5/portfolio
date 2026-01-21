interface TechTagProps {
  name: string;
}

export function TechTag({ name }: TechTagProps) {
  return (
    <span className="inline-block px-3 py-1 text-xs bg-card border border-border rounded text-muted">
      {name}
    </span>
  );
}
