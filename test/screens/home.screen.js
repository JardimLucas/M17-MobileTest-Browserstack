class HomeScreen {

    get #initialSkip() { return $('id:button_skip') } //ok
  
    get enterStoreAdress() { return $('id:button_login_store') } //ok
  
    async initial() {
      await this.#initialSkip.click()
    }
  
    async goToLogoin() {
      await this.enterStoreAdress.click()
    }
  
  }
  module.exports = new HomeScreen()