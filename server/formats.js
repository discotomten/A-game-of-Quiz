"use strict";
//Tillåter bara en .com .se etc och ett @
export function isValidEmail(email) {
  const mailcheck = /^[^@\s]+@[a-zA-Z0-9-]+\.(com|se|net|org)$/;
  return mailcheck.test(email);
}

export function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}
