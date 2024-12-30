import { Checkbox } from "components/UI";

interface Props {
  id: string;
  type: string;
  use: boolean;
  updateUse: (newUse: boolean) => void;
}

export function UseCheckbox({ id, type, updateUse, use }: Props) {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Checkbox
        id={id}
        label={`Use ${type}`}
        isChecked={use}
        onChange={(isChecked: boolean) => updateUse(isChecked)}
      />
    </div>
  );
}
