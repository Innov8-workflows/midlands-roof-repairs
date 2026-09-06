/* Thin wrapper. The engine lives in the kit so every project gets its fixes.
   cli() must be called explicitly: require.main is this wrapper, not the engine,
   so the engine's own CLI branch does not fire.
   Run: node build.js   then: node C:\\Users\\Jay\\.claude\\site-kit\\engine\\check.js */
require("C:\\Users\\Jay\\.claude\\site-kit\\engine\\build.js").cli(__dirname);
