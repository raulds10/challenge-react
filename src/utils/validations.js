export const isValidEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
export const isValidPhone = (phone) => phone.length > 8 && phone.length < 13;
export const isValidCC = (cc) => cc.length > 6;
export const isValidPresence = (value) => !!value;
export const isValidName = (name) => /^[a-zA-ZÀ-ú ]*$/.test(name);
export const isValidLastName = (lastName) => /^[a-zA-ZÀ-ú ]*$/.test(lastName);

