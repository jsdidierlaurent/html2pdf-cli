# html2pdf-cli
CLI wrapper for using puppeteers to export html to pdf

See: [Puppeteers](https://github.com/GoogleChrome/puppeteer) for more information

## Usage Manualy

Required :
* [Nodejs 8+](https://nodejs.org/en/)
* [Npm](https://www.npmjs.com/get-npm)

```bash 
# You can use command directly with node (require node 8+)
npm install --production
npm start [options] http://www.google.com Google.pdf

# You can also installing command globaly
npm --production
npm link
html2pdf-cli [options] http://www.google.com Google.pdf
```

## Usage in CI (or without nodejs)

Required :
* [Docker](https://docs.docker.com/install/)

```bash 
docker run -it --rm -v ${PWD}:/dest jsdidierlaurent/html2pdf-cli:latest \
  html2pdf-cli [options] http://www.google.com Google.pdf
```

## Options
```
  -f, --format <string>       Paper format. If set, takes priority over width or height options. Defaults to 'A4'.
  -w, --width <string>        Paper width, accepts values labeled with units.
  -h, --height <string>       Paper height, accepts values labeled with units.
  -p, --page-ranges <string>  Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
  -m, --media <string>        Changes the CSS media type of the page. Defaults to 'print'. Passing null disables media emulation.
  --margin-top <string>       Top margin, accepts values labeled with units. Defaults to 0
  --margin-bottom <string>    Bottom margin, accepts values labeled with units. Defaults to 0
  --margin-left <string>      Left margin, accepts values labeled with units. Defaults to 0
  --margin-right <string>     Right margin, accepts values labeled with units. Defaults to 0
  -v, --version               output the version number
  -h, --help                  output usage information
```