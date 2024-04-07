const NAME_REGEXP = /^[가-힣a-zA-Z]+$/;
const EMAIL_REGEXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const EXCLUDE_SPACE_REGEXP = /^\S*$/;
const ID_REGEXP = /^[0-9a-zA-Z]{4,}$/;
const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export { EMAIL_REGEXP, EXCLUDE_SPACE_REGEXP, ID_REGEXP, NAME_REGEXP, PASSWORD_REGEXP };
