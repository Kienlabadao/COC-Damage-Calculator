interface Props {
  content: string;
  isModifierActive: boolean;
}

export function ContentContainer({ content, isModifierActive }: Props) {
  return (
    <div className={`fw-bold${isModifierActive ? " text text--raged" : ""}`}>
      {content}
    </div>
  );
}
