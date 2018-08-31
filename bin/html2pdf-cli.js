#!/usr/bin/env node

const program = require('commander')
const puppeteer = require('puppeteer')

// Define global command options
program
  .version('0.0.1', '-v, --version')
  .description(
    `CLI wrapper for using puppeteers to export html to pdf

    For more information about puppeteer see : https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md`
  )

// Define default result in case of wrong command
program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '))
  process.exit(1)
})

// Define main command
program
  .command('export <url> <path>')
  .description(`Export website page to PDF.
  Example : export --format A3 https://my.website.com /path/to/my/export.pdf`)
  .option('-f, --format <string>',
    `Paper format. If set, takes priority over width or height options. Defaults to 'A4'.`)
  .option('-w, --width <string>', `Paper width, accepts values labeled with units.`)
  .option('-h, --height <string>', `Paper height, accepts values labeled with units.`)
  .option('--margin-top <string>', `Top margin, accepts values labeled with units. Defaults to 0`)
  .option('--margin-bottom <string>', `Bottom margin, accepts values labeled with units. Defaults to 0`)
  .option('--margin-left <string>', `Left margin, accepts values labeled with units. Defaults to 0`)
  .option('--margin-right <string>', `Right margin, accepts values labeled with units. Defaults to 0`)
  .option('-p, --page-ranges <string>',
    `Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.`)
  .option('-m, --media <string>', `Changes the CSS media type of the page. Defaults to 'print'
    The only allowed values are 'screen', 'print' and null. Passing null disables media emulation.`)
  .action((url, path, options) => {
    options.format = options.format || 'A4'
    options.marginTop = options.marginTop || 0
    options.marginBottom = options.marginBottom || 0
    options.marginLeft = options.marginLeft || 0
    options.marginRight = options.marginRight || 0
    options.media = options.marginRight || 'print'

    html2pdf(url, path, options)
  })

program.parse(process.argv)

// Define default result in case of missing command
if (process.argv.length === 2) {
  program.help()
}

/**
 * Transforme static HTML page to PDF
 * @param {*} url URL of the HTML page (can be a local file)
 * @param {*} path Path to the PDF file
 * @param {*} options Option define in the command
 */
async function html2pdf(url, path, options) {
  console.log(`Exporting ${url} to ${path}...`)

  let browser
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--hide-scrollbars',
        '--disable-web-security',
      ],
    })

    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0' })
    if (options.media) {
      await page.emulateMedia(options.media)
    }

    await page.pdf({
      path: path,
      format: options.format,
      width: options.width,
      height: options.height,
      pageRanges: options.pageRanges,
      displayHeaderFooter: false,
      printBackground: true,
      margin: {
        top: options.marginTop,
        right: options.marginRight,
        bottom: options.marginBottom,
        left: options.marginLeft,
      },
    })
    await browser.close()

    console.log(`Finished.`)
  } catch (err) {
    if (browser) {
      await browser.close()
    }
    throw err
  }
}
