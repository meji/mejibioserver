module.exports = ({ firstname, lastname, telnum, email, agree, contactType, messagetext, subject}) => {
  return `<h1>Recibido mensaje de ${firstname} ${lastname}</h1>
    <h2>${subject}</h2>
    <p>Teléfono: ${telnum}</p>
    <p>Email: ${email}</p>
    <p>Aceptado checkbox: ${agree}</p>
    <p>Quiere que le contactes por ${contactType}</p>
    <h3>Mensaje: </h3>
    <p>${messagetext}</p>
    `;
};
