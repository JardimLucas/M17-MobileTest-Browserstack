class LoginScreen {

    get #enderecoLoja() { return $('android.widget.EditText') } //ok class //http://lojaebac.ebaconline.art.br
    get #continue() { return $('id:bottom_button') } //ok continuar
  
    get #emailLogin() { return $('android.widget.EditText') } //ok entrar com email
    get continue1() { return $('id:login_continue_button') } //ok continuar
  
    get #password() { return $('id:input') }
    get continue2() { return $('id:bottom_button') } //ok continuar
  
  
    async colocarEndLoja(url) {
      await this.#enderecoLoja.setValue(url)
      await this.#continue.click()
    }
  
    async emailLogin(email) {
      await this.#emailLogin.setValue(email)
      await this.continue1.click()
    }
  
    async login(password) {
      await this.#password.setValue(password)
      await this.continue2.click()
    }
  
  
  }
  
  module.exports = new LoginScreen()