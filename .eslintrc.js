module.exports = {
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jest": true
    },
    "plugins": [
        "react"
    ],
    "rules":{
    "react/react-in-jsx-scope": "off",
},
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parser": "@babel/eslint-parser",
    "parserOptions": {
         "sourceType": "module",
         "allowImportExportEverywhere": true,
        "requireConfigFile": false,
        "babelOptions": {
            "presets": ["@babel/preset-react"]
         }
      }
};