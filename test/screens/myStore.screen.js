class MyStoreScreen {
    get myStoreLog() { return $('~My store') }
    get myStoreName() { return $('id:toolbar_subtitle') }
  
  
  
    async getStoreName() {
      return await this.myStoreName.getText()
  
    }
  
    async myStoreLogoDisplayed() {
      await this.myStoreLog.waitForExist()
      return await this.myStoreLog.isDisplayed()
    }
  
  
  }
  module.exports = new MyStoreScreen()