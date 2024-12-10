interface Props {
  id: string;
  label: string;
  isChecked: boolean;
  onInput: (isChecked: boolean) => void;
}

export function Checkbox({ id, label, isChecked, onInput }: Props) {
  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    onInput(event.target.checked);
  }

  return (
    <>
      <input
        className="form-check-input checkbox me-1"
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label className="h5 mb-0" htmlFor={id}>
        {label}
      </label>
    </>
  );
}
