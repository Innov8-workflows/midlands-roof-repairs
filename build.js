/* Thin wrapper. The engine lives in the kit so every project gets its fixes.
   cli() must be called explicitly: require.main is this wrapper, not the engine,
   so the engine's own CLI branch does not fire.
   Run: node build.js   then: node C:\\Users\\Jay\\.claude\\site-kit\\engine\\check.js */
/* The homepage review badge hrefs are baked into _src/body.html, so they would
   otherwise go stale the moment content/site.js changed - which they did, once.
   Idempotent, and it runs before the engine so the sync is in the build. */
require("./sync-review-links.js")(__dirname);

require("C:\\Users\\Jay\\.claude\\site-kit\\engine\\build.js").cli(__dirname);
