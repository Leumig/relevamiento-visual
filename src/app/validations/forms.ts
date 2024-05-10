// forms.ts

// Función para validar la longitud mínima de un campo
export function minLengthValidator(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

// Función para validar un correo electrónico
export function emailValidator(value: string): boolean {
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
}
