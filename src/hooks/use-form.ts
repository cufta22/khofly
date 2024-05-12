import { FormEventHandler, useState } from "react";
import { useNonInitialEffect } from "./use-non-initial-effect";

interface Args<T extends Record<string, string>> {
  initialValues: T;
  validate?: Partial<{ [key in keyof T]: (val: string) => string | null }>;
}

// Lightweight version of @mantine/form useForm()

const useForm = <T extends Record<string, string>>({
  initialValues,
  validate,
}: Args<T>) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{
    [key in keyof T]: string | null;
  }>(
    Object.keys(initialValues).reduce(
      (acc, key) => ({ ...acc, [key]: null }),
      {} as { [key in keyof T]: string | null }
    )
  );

  const setFieldValue = <K extends keyof T>(field: K, val: string) => {
    // Reset errors
    setErrors((prev) =>
      Object.keys(prev).reduce(
        (acc, key) => ({ ...acc, [key]: null }),
        {} as { [key in keyof T]: string | null }
      )
    );

    setValues((prev) => ({ ...prev, [field]: val }));
  };

  const reset = () => {
    // Reset values
    setValues(initialValues);

    // Reset errors
    setErrors((prev) =>
      Object.keys(prev).reduce(
        (acc, key) => ({ ...acc, [key]: null }),
        {} as { [key in keyof T]: string | null }
      )
    );
  };

  const onSubmit =
    (submitFn: (values: T) => void) =>
    (event: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      // Validate all fields
      let newErrors = {} as { [key in keyof T]: string | null };

      for (const field in initialValues) {
        if (validate && validate[field]) {
          const error = validate?.[field]?.(values[field]);
          newErrors = { ...newErrors, ...{ [field]: error } };
        }
      }

      // Check if there are any errors
      const hasErrors = Object.values(newErrors).some(
        (error) => error !== null
      );

      if (hasErrors) {
        // Update the errors state
        setErrors(newErrors);
      } else {
        submitFn(values);
      }
    };

  return {
    values,
    errors,
    setFieldValue,
    onSubmit,
    reset,

    getInputProps: <K extends keyof T>(field: K) => ({
      name: field,
      value: values[field],
      error: errors[field],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(field, e.currentTarget.value);
      },
    }),
  };
};

export default useForm;
