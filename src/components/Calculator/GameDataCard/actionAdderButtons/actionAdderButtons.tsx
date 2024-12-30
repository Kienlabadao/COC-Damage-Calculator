import { Button } from "components/UI";
import { BS_COLOR } from "data/constants";

interface Props {
  createAction: (count: number) => void;
}

export const ActionAdderButtons = ({ createAction }: Props) => {
  return (
    <div className="d-flex justify-content-md-evenly justify-content-center gap-3">
      <Button color={BS_COLOR.Green} onClick={() => createAction(1)}>
        Add 1
      </Button>
      <Button color={BS_COLOR.Green} onClick={() => createAction(5)}>
        Add 5
      </Button>
    </div>
  );
};
