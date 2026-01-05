"use strict";
//Tillåter bara en .com .se etc och ett @
export function isValidEmail(email) {
  const mailcheck = /^[^@\s]+@[a-zA-Z0-9-]+\.(com|se|net|org)$/;
  return mailcheck.test(email);
}

