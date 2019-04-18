# Bubble Frontend

Code contains:
* Bot backend framework
* Visualization framework

## Installation 
Run the following commands:
```
$ git clone https://github.com/prastut/bubble-frontend.git
$ npm install
$ npm start
```

## Docs

* [API](./docs/API.MD)
* [Viz](./docs/VIZ.MD)

## Troubleshooting

If you get `node-gyp` errors in installation, check the error log. Most probably your default python environment flag has been changed to v3 instead of 2.7. JsDOM (one of the dev dependencies) has an internal dependency on `node-gyp` which requires `python2.7` to compile. Run the following to ensure proper installation:

```
$ npm install --python=python2.7
```

