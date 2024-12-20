import { ReactNode, useState } from "react";
import { BS_COLOR } from "data/constants";
import { Collapse } from "react-bootstrap";
import { Button } from "components/Button";

interface Props {
  id: string;
  children: ReactNode;
  buttonContainerClassName?: string;
  openText?: string;
  closeText?: string; // Optional: Text when the collapse is closed
  defaultOpen?: boolean;
}

export const CollapseContainer = ({
  id,
  children,
  buttonContainerClassName = "",
  openText = "Show",
  closeText = "Hide",
  defaultOpen = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isContentLoaded, setIsContentLoaded] = useState(defaultOpen);

  const handleCollapse = () => {
    if (!isContentLoaded) {
      setIsContentLoaded(true); // Load content when opening for the first time
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={buttonContainerClassName}>
        <Button
          color={BS_COLOR.Gray}
          aria-controls={id}
          aria-expanded={isOpen}
          onClick={handleCollapse}
        >
          {isOpen ? closeText : openText}
        </Button>
      </div>
      <Collapse in={isOpen}>
        <div>{isContentLoaded && children}</div>
      </Collapse>
    </>
  );
};
