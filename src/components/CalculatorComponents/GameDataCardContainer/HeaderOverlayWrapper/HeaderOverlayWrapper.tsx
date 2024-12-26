import { Overlay, OverlayType, POSITION } from "../Overlay";

export interface Props {
  type: OverlayType;
  content: string;
}

export function HeaderOverlayWrapper({ type, content }: Props) {
  return (
    <div className="object-container__header">
      <Overlay type={type} position={POSITION.Header} content={content} />
    </div>
  );
}
