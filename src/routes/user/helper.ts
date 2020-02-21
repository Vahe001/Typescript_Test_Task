import { createTransport } from 'nodemailer';
import config from './../../config/index.js'

export default function () {
  return createTransport({
    service: "Gmail",
    auth: {
      user: config.GMAIL.USER,
      pass: config.GMAIL.PASS
    }
  })
}