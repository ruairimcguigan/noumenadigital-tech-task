import * as fs from "fs"
import * as CSV from "csv-string"
import moment from "moment"
interface Customer {
    name: string
    address: string
    postcode: string
    phone: string
    creditLimit: number
    birthday: Date
}
export const program = (args: string[]): void => {
    if ((args.length - 2 < 2)) throw Error(`args expected=2 got=${args.length - 2}`)
    const customers = parseCustomers(args[2], fs.readFileSync(0, {encoding: encodingFormat}).toString())
    writeCustomers(args[3], customers)
}
const parseCustomers = (fileFormat: string, stdin: string): Customer[] => {
    switch (fileFormat) {
        case csv:return parseCsv(stdin)
        case prn:return parsePrn(stdin)
        default:throw Error(`arg[0] expected=csv|prn got=${fileFormat}`)
    }
}
const parseCsv = (stdin: string): Customer[] => CSV.parse(stdin)
    .map((row) => ({
        name: row[0],
        address: row[1],
        postcode: row[2],
        phone: row[3],
        creditLimit: parseFloat(row[4]),
        birthday: moment(row[5], "DD/MM/YYYY").toDate()
    })).slice(1)
const parsePrn = (stdin: string): Customer[] => stdin.split('\n')
    .filter((line) => line.length > 0)
    .map((line) => ({
        name: line.slice(0, 15).trim(),
        address: line.slice(16, 37).trim(),
        postcode: line.slice(38, 46).trim(),
        phone: line.slice(47, 61).trim(),
        creditLimit: parseFloat(line.slice(61, 72).trim()) / 10,
        birthday: moment(line.slice(73, 82).trim(), "YYYYMMDD").toDate()
    })).slice(1)
const writeCustomers = (fileFormat: string, customers: Customer[]) => {
    switch (fileFormat) {
        case json:return writeJson(customers)
        case html:return writeHtml(customers)
        default:throw Error(`arg[1] expected=json|html got=${fileFormat}`)
    }
}
const writeJson = (customers: Customer[]) => process.stdout.write(JSON.stringify(
    customers.map((customer) => ({
        ...customer,
        creditLimit: formatter.format(customer.creditLimit),
        birthday: moment(customer.birthday).format(outputDateFormat)
    }))
), decodingFormat)
const writeHtml = (customers: Customer[]) => process.stdout.write(`
  <html>
    <head>
      <title>Workbook</title>
    </head>
    <body>
      <table>
        <tr>
          ${["Name", "Address", "Postcode", "Phone", "Credit Limit", "Birthday"]
    .map((header) => `<th>${header}</th>`).join("")
}
        </tr>
        ${customers.map((customer) => `
        <tr>
          <td>${customer.name}</td>
          <td>${customer.address}</td>
          <td>${customer.postcode}</td>
          <td>${customer.phone}</td>
          <td>${formatter.format(customer.creditLimit)}</td>
          <td>${moment(customer.birthday).format(outputDateFormat)}</td>
        </tr>`).join("")}
      </table>
    </body>
  </html>
`, decodingFormat)
const formatter = new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
});
const csv = "csv";
const prn = "prn";
const outputDateFormat = "YYYY-MM-DD";
const json = "json";
const html = "html";
const encodingFormat = "latin1"
const decodingFormat = "utf8";