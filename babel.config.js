module.exports = function (api) {
    api.cache(true);
    return {
      "presets": [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      "plugins": [
        "@babel/plugin-transform-class-static-block",
        ["module:react-native-dotenv", {
          "moduleName": "@env",
          "path": ".env",
          "safe": false,
          "allowUndefined": true
        }]
      ]
      
    };
  };