// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  endpoint: 'https://node-prorizontal.herokuapp.com',
  captcha: {
    secret_key: '6LcLvNIZAAAAAGqk6zEnRGqlgWC74Ex-kbOeE7QY',
    web_key: '6LcLvNIZAAAAANg5uBeHJle9CjDNtdqMHkQu1qql'
  },
  firebaseConfig : {
    apiKey: "AIzaSyBKCZiHez2Hm_91z7K0LXljPuqeWOVV4eY",
    authDomain: "merakilab-e284b.firebaseapp.com",
    databaseURL: "https://merakilab-e284b.firebaseio.com",
    projectId: "merakilab-e284b",
    storageBucket: "merakilab-e284b.appspot.com",
    messagingSenderId: "647931356436",
    appId: "1:647931356436:web:cfe7a2f8e4e6953b288e01",
    measurementId: "G-KWYW1ZN9XZ"
  }
};
