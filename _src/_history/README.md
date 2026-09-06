# How _src/body.html got here

`body.html` started as the kit's golden body (`C:\Users\Jay\.claude\site-kit\template\body.html`)
and was rewritten for Midland Roof Shield by `edit1.js` then `edit2.js`, in that order.

They are kept as a record of what changed, not as a build step. They assert every
find-string appears exactly once, so re-running them against the current
`body.html` will fail - which is the point. **`body.html` is now the source.**
Edit it directly, or edit `site.config.js`, and re-run `node build.js`.
