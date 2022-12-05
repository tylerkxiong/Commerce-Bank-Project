// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiBaseUrl: 'http://localhost:8080',
  stripe:{
    key: "pk_test_51M1JAjGuzfMVvAoE4vxI98LcuDG0KEAjpTb87wWIJsjtrYw3sK4COV3SghDBhMXd2w1tIDvU9ODt4lBcmS6F0BoG00E18dApR3",
    payments_webhook_secret: "whsec_Mx55iLHanddY64thD3S2OpiWHlZtHWwi",

  },
  firebase: {
    apiKey: "AIzaSyBWJOq_Alxl-g8Nkih3ykRGdZR4bioCtcc",
    authDomain: "donation-8f90d.firebaseapp.com",
    projectId: "donation-8f90d",
    storageBucket: "donation-8f90d.appspot.com",
    messagingSenderId: "635612753662",
    appId: "1:635612753662:web:fc4328da231c7ae5943faf"






    /*apiKey: "AIzaSyCnBm9L6XRjcB-3lEs45rJCfSkKvXbN7Nk",
    authDomain: "cbfs-87659.firebaseapp.com",
    projectId: "cbfs-87659",
    storageBucket: "cbfs-87659.appspot.com",
    messagingSenderId: "762205654692",
    appId: "1:762205654692:web:41c5970c82edb59d4da031"*/
  },

  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
