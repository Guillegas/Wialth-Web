import puppeteer from 'puppeteer'
import path from 'path'
import os from 'os'

const DESKTOP = os.homedir() + '/Desktop'

const browser = await puppeteer.launch({ headless: 'new' })
const page    = await browser.newPage()

// 2× retina para PNG de alta calidad
await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 })
await page.goto('http://localhost:5176', { waitUntil: 'networkidle0' })

// Esperar a que los mockups estén visibles
await page.waitForSelector('.animate-phone-in', { timeout: 10000 })
await new Promise(r => setTimeout(r, 1500))

// Capturar los dos teléfonos por separado
const phones = await page.$$('.animate-phone-in')

if (phones.length < 2) {
  console.error('No se encontraron los 2 mockups. Encontrados:', phones.length)
  await browser.close()
  process.exit(1)
}

const out1 = path.join(DESKTOP, 'wialth-mockup-dashboard.png')
const out2 = path.join(DESKTOP, 'wialth-mockup-chat.png')

await phones[0].screenshot({ path: out1, omitBackground: true })
console.log('✓ Guardado:', out1)

await phones[1].screenshot({ path: out2, omitBackground: true })
console.log('✓ Guardado:', out2)

await browser.close()
console.log('Listo.')
