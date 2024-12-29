interface Props {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  className?: string;
}

export function Checkbox({
  id,
  label,
  isChecked,
  onChange,
  className = "",
}: Props) {
  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.checked);
  }

  return (
    <div className={`d-flex align-items-center ${className}`}>
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
    </div>
  );
}
