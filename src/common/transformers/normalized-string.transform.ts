import { Transform } from 'class-transformer';

function normalizeString(
  value: unknown,
  options?: { lowercase?: boolean; emptyAsUndefined?: boolean },
) {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  if (trimmed.length === 0 && options?.emptyAsUndefined) {
    return undefined;
  }

  return options?.lowercase ? trimmed.toLowerCase() : trimmed;
}

export function TrimString() {
  return Transform(({ value }) => normalizeString(value));
}

export function TrimToLowerCase() {
  return Transform(({ value }) => normalizeString(value, { lowercase: true }));
}

export function OptionalTrimString() {
  return Transform(({ value }) =>
    normalizeString(value, { emptyAsUndefined: true }),
  );
}

export function OptionalTrimToLowerCase() {
  return Transform(({ value }) =>
    normalizeString(value, { lowercase: true, emptyAsUndefined: true }),
  );
}
