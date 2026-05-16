export const FormErrors: Record<string, string> = {
  required: 'Este campo es requerido',
  minlength: 'El valor es demasiado corto',
  whitespace: 'No puede estar vacío',
  onlyNumbers: 'Solo se permiten números',
  exactLength: 'Longitud incorrecta',
  minAge: 'Edad mínima no válida',
  maxAge: 'Edad máxima no válida',
};

export function getError(control: import('@angular/forms').AbstractControl | null): string {
  if (!control?.errors) return '';
  const firstKey = Object.keys(control.errors)[0];
  return FormErrors[firstKey] ?? 'Campo inválido';
}
