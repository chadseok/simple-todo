export const validator = {
  checkEmail: (email: string) => {
    return new RegExp(
      /^[\w.!#$%&'*+/=?^`{|}~-]+@[\w.!#$%&'*+/=?^`{|}~-]+$/
    ).test(email);
  },
  checkPassword: (password: string) => {
    return password.length < 8 ? false : true;
  },
};
