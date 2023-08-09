import * as React from "react";
import { Input } from "./ui/input";

export interface DebouncedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string | number) => void;
  value: string | number;
  debounce?: number;
}

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: DebouncedInputProps) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const debouncedOnChange = React.useCallback(
    (newValue: string | number) => {
      onChange(newValue);
    },
    [onChange]
  );

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      debouncedOnChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, debouncedOnChange]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
