import { BSColor } from "data/constants";
import { Button } from "components";
import { ReactNode } from "react";

interface OpenButtonProps {
  children: ReactNode;
  color?: BSColor;
}

interface ModalButtonProps {
  children: ReactNode;
  color?: BSColor;
  onClick?: () => void;
  closeOnClick?: boolean;
}

interface ModalProps {
  id: string;
  title: string;
  children: ReactNode;
  openButtonProps: OpenButtonProps;
  modalButtons: ModalButtonProps[];
}

export function Modal({
  id,
  title,
  children,
  openButtonProps,
  modalButtons,
}: ModalProps) {
  return (
    <>
      <Button
        color={openButtonProps.color}
        data-bs-toggle="modal"
        data-bs-target={`#${id}`}
      >
        {openButtonProps.children}
      </Button>

      <div
        className="modal fade"
        id={id}
        tabIndex={-1}
        aria-labelledby={`${id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`${id}Label`}>
                {title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              {modalButtons.map((button, index) => (
                <Button
                  key={index}
                  color={button.color}
                  onClick={button.onClick}
                  {...(button.closeOnClick
                    ? { "data-bs-dismiss": "modal" }
                    : {})}
                >
                  {button.children}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
