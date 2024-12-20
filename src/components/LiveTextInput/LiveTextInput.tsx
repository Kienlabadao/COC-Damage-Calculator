interface Props {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeHolder?: string;
  className?: string;
}

export function LiveTextInput({
  id,
  value,
  onChange,
  placeHolder = "",
  className = "",
}: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div className={`search-box shadow ${className}`}>
      <i className="fa fa-search" aria-hidden="true"></i>
      <input
        type="text"
        className="form-control search-box__input"
        placeholder={placeHolder}
        id={id}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
