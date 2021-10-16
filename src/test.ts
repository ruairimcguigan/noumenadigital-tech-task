import { exec } from "child_process"

exec('cat Workbook2.csv | node dist/index.js csv html', (_, csvToHtmlOutput) => {
    exec('cat Workbook2.prn | node dist/index.js prn html', (_, prnToHtmlOutput) => {
        if (csvToHtmlOutput !== prnToHtmlOutput) throw Error("FAILED csv html <> prn html")
        else console.dir("PASSED csv html <> prn html")
    });
});

exec('cat Workbook2.csv | node dist/index.js csv json', (_, csvToJsonOutput) => {
    exec('cat Workbook2.prn | node dist/index.js prn json', (_, prnToHtmlOutput) => {
        if (csvToJsonOutput !== prnToHtmlOutput) throw Error("FAILED csv json <> prn json")
        else console.dir("PASSED csv json <> prn json")
    });
});