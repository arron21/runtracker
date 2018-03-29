// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyAzpbFEdJ5bVqkttKX2c5kvF3tuV24_j_w",
      authDomain: "runtracker-7c76c.firebaseapp.com",
      databaseURL: "https://runtracker-7c76c.firebaseio.com",
      projectId: "runtracker-7c76c",
      storageBucket: "runtracker-7c76c.appspot.com",
      messagingSenderId: "860132774261"
  }
};
