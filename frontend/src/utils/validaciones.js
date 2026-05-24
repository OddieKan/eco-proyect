function validarPassword(password) {
  return password.length >= 6;
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarNombre(nombre) {
  return nombre.length >= 2;
}

function validarApellido(apellido) {
  return apellido.length >= 2;
}

module.exports = {
  validarPassword,
  validarEmail,
  validarNombre,
  validarApellido
};