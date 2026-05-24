const {
  validarPassword,
  validarEmail,
  validarNombre,
  validarApellido
} = require('../utils/validaciones');

test('validar contraseña mínimo 6 caracteres', () => {
  expect(validarPassword('123456')).toBe(true);
  expect(validarPassword('123')).toBe(false);
});

test('validar email correcto', () => {
  expect(validarEmail('test@gmail.com')).toBe(true);
  expect(validarEmail('testgmail.com')).toBe(false);
});

test('validar nombre y apellido mínimo 2 caracteres', () => {
  expect(validarNombre('Gi')).toBe(true);
  expect(validarNombre('G')).toBe(false);

  expect(validarApellido('Lo')).toBe(true);
  expect(validarApellido('L')).toBe(false);
});