const homeScreen = require("../screens/home.screen");
const loginScreen = require("../screens/login.screen");
const myStoreScreen = require("../screens/myStore.screen");
// 

describe('Acessar painel admin', () => {

  let urlLoja = 'http://lojaebac.ebaconline.art.br/'
  let password = 'GD*peToHNJ1#c$sgk08EaYJQ'
  let email = 'lojaebacqe@gmail.com'

  it('Deve fazer login com sucesso', async () => {
    await homeScreen.initial()
    await homeScreen.goToLogoin()

    await loginScreen.colocarEndLoja(urlLoja)
    await loginScreen.emailLogin(email)
    await loginScreen.login(password)


    expect(await myStoreScreen.myStoreLogoDisplayed()).toBeTruthy()
    expect(await myStoreScreen.getStoreName()).toEqual('EBAC - Shop')
  });
});