//const { join } = require('path')

const allure = require('allure-commandline')
const video = import('wdio-video-reporter')

exports.config = {
    user: process.env.BROWSERSTACK_USERNAME || 'lucasdovallejard_DTyCU7',
    key: process.env.BROWSERSTACK_ACCESS_KEY || '62NxsaV1KvQtTzBFxbKu',
    hostname: 'hub.browserstack.com',
    services: [
      [
        'browserstack',
        {
          app: 'bs://84ab3eb9273a7ad4b5708473ce8477a99a4c3809',
          buildIdentifier: "${BUILD_NUMBER}",
          browserstackLocal: true
        },
      ]
    ],

    capabilities: [{
        'bstack:options': {
          deviceName: 'Samsung Galaxy S22 Ultra',
          platformVersion: '12.0',
          platformName: 'android',
        },         
        'bstack:options': {
          deviceName: 'Google Pixel 7 Pro',
          platformVersion: '13.0',
          platformName: 'android',
        }, 
        'bstack:options': {
          deviceName: 'OnePlus 9',
          platformVersion: '11.0',
          platformName: 'android',
        }
      }],
      commonCapabilities: {
        'bstack:options': {
          projectName: "Meu primeiro projeto Device Farm",
          buildName: "Teste01",
          debug: true,
          networkLogs: true
        }
      },

    //runner: 'local',
    specs: ['test/specs/**/*.spec.js'],
    exclude: [],
    maxInstances: 20,
    /*
    capabilities: [{
        "platformName": "Android",
        "platformVersion": "9.0",
        "deviceName": "ebac-qe",
        "automationName": "UiAutomator2",
        "app": join(process.cwd(), './app/android/wcandroid-13.6.apk'),
        "appPackage": 'com.woocommerce.android',
        "appActivity": '.ui.main.MainActivity',
        "appWaitActivity": 'com.woocommerce.android.ui.login.LoginActivity',
        'newCommandTimeout': 240
    }],
    */
    logLevel: 'info',
    bail: 0,
    //hostname: '127.0.0.1',
    //port: 4723,
    //path: '/wd/hub',
    waitforTimeout: 20000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    //services: ['sauce'],
    //services: ['appium'],
    //services: ['chromedriver'],
    framework: 'mocha',
    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
        ['video', {
            saveAllVideos: true,       // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 30, // Higher to get slower videos, lower for faster videos [Value 1-100]
        }],],
    onComplete: function () {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },

    afterStep: async function (step, scenario, { error, duration, passed }, context) {
        await driver.takeScreenshot();
    },

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }

}