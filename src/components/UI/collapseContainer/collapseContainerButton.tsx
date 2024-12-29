import { BSColor } from "data/constants";
import { Button } from "react-bootstrap";
import { useCollapseContainerContext } from "./collapseContainerContext";

interface Props {
  color: BSColor;
  openText?: string;
  closeText?: string;
}
export function CollapseContainerButton({
  color,
  openText = "Show",
  closeText = "Hide",
}: Props) {
  const { id, isOpen, handleCollapse } = useCollapseContainerContext();

  return (
    <Button
      color={color}
      onClick={handleCollapse}
      aria-controls={id}
      aria-expanded={isOpen}
    >
      {isOpen ? closeText : openText}
    </Button>
  );
}
