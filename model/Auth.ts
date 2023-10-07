class Auth {
  email: string;
  password: string;
  confirmEmail?: string;
  confirmPassword?: string;

  // prettier-ignore
  constructor(email: string, password: string, confirmEmail?: string,  confirmPassword?: string) {
    this.email = email;
    this.password = password;
    this.confirmEmail = confirmEmail;
    this.confirmPassword = confirmPassword;
  }
}

export default Auth;
