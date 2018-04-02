## Set up
```
$ yarn
$ yarn bundle
```

Open `dist/entryA.html` in a browser and you get this error

```
entry-my-runtime.js:1 Uncaught (in promise) Error: Loading chunk 0 failed.
    at HTMLScriptElement.s (entry-my-runtime.js:1)
```

`dist/entryB.html` works fine.