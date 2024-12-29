import { Field, Label, NumberInputField } from "components/UI";

interface Props {
  id: string;
  minCount: number;
  maxCount: number;
  currentCount: number;
  updateCount: (newCount: number) => void;
}

export function DonatedSpellCountInputField({
  id,
  currentCount,
  maxCount,
  minCount,
  updateCount,
}: Props) {
  return (
    <NumberInputField id={id}>
      <Label content={`Number of spell in clan castle:`} className="fw-bold" />
      <Field
        minValue={minCount}
        maxValue={maxCount}
        currentValue={currentCount}
        onChange={(newCount: number) => updateCount(newCount)}
      />
    </NumberInputField>
  );
}
