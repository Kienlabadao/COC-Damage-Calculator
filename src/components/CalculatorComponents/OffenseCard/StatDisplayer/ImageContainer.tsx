interface Props {
  imagePath: string;
}

export function ImageContainer({ imagePath }: Props) {
  return <img src={imagePath} width="20" />;
}
