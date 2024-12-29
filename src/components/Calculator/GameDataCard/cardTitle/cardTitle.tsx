interface Props {
  title: string;
}

export function CardTitle({ title }: Props) {
  return <h5>{title}</h5>;
}
