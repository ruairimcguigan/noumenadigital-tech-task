import * as fs from "fs"
import * as CSV from 'csv-string'

interface Customer {
  name: string
  address: string
  postcode: string
  phone: string
  creditLimit: string
  birthday: string
}

const headers = ["Name", "Address", "Postcode", "Phone", "Credit Limit", "Birthday"]

export const program = (args: string[]): void => {
  if ((args.length - 2 < 2)) throw Error(`args expected=2 got=${args.length - 2}`)
  const customers = readCustomers(args[2], fs.readFileSync(0, { encoding: "latin1" }).toString())
  writeCustomers(args[3], headers, customers)
}

const readCustomers = (arg0: string, stdin: string): Customer[] => {
  switch (arg0) {
    case "csv":
      return readCsv(stdin)
    case "prn":
      return readPrn(stdin)
    default:
      throw Error(`arg[0] expected=csv|prn got=${arg0}`)
  }
}

const readCsv = (stdin: string): Customer[] => CSV.parse(stdin)
    .map((row) => ({
      name: row[0],
      address: row[1],
      postcode: row[2],
      phone: row[3],
      creditLimit: row[4],
      birthday: row[5]
    })).slice(1)

const readPrn = (stdin: string): Customer[] => {
  throw Error(`CSV reading not supported: got=${stdin}`)
}

const writeCustomers = (arg1: string, headers: string[], customers: Customer[]) => {
  switch (arg1) {
    case "json":
      return writeJson(customers)
    case "html":
      return writeHtml(headers, customers)
    default:
      throw Error(`arg[1] expected=json|html got=${arg1}`)
  }
}

const writeJson = (customers: Customer[]) => {
  process.stdout.write(JSON.stringify(customers))
}

const writeHtml = (headers: string[], customers: Customer[]) => {
  process.stdout.write(`
    <html>
      <head>
        <title>Workbook</title>
      </head>
      <body>
        <table>
          <tr>
            ${headers.map((header) => `<th>${header}</th>`).join("")}
          </tr>
          ${customers.map((customer) => `
          <tr>
            <td>${customer.name}</td>
            <td>${customer.address}</td>
            <td>${customer.postcode}</td>
            <td>${customer.phone}</td>
            <td>${customer.creditLimit}</td>
            <td>${customer.birthday}</td>
          </tr>`).join("")}
        </table>
      </body>
    </html>
  `)
}