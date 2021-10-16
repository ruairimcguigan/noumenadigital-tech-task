import * as fs from "fs";

interface Customer {
  name: string
  address: string
  postcode: string
  phone: string
  creditLimit: string
  birthday: string
}

export const program = (args: string[]): void => {
  if ((args.length - 2 < 2)) throw Error(`args expected=2 got=${args.length - 2}`)
  if (args[2] !== "csv" && args[2] !== "prn") throw Error(`arg[0] expected=csv|prn got=${args[2]}`)
  if (args[3] !== "json" && args[3] !== "html") throw Error(`arg[1] expected=json|html got=${args[3]}`)
  const customers = readCustomers(args[2], fs.readFileSync(0).toString())
  console.dir(customers)
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

const readCsv = (stdin: string): Customer[] => {
  throw Error(`CSV reading not supported: got=${stdin}`)
}

const readPrn = (stdin: string): Customer[] => {
  throw Error(`CSV reading not supported: got=${stdin}`)
}

const writeJson = (customers: Customer[]) => {
  console.dir(customers)
}

const writeHtml = (customers: Customer[]) => {
  console.dir(customers)
}