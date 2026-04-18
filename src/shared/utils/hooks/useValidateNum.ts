export const useValidateNum = () => {
  const validateNum = ({
    value,
    min,
    max,
  }: {
    value: string;
    min?: number;
    max?: number;
  }): number | false | undefined => {
    if (value.trim() === '') {
      return undefined;
    }
    const num = Number(value);
    if (!Number.isFinite(num)) {
      return false;
    }
    if (min !== undefined && num < min) {
      return false;
    }
    if (max !== undefined && num > max) {
      return false;
    }
    return num;
  };

  return { validateNum };
};
