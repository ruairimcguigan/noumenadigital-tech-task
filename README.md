## Prerequsites 
- node 16
- npm 7

## Build
```
npm install
npm run build
```

## Run
```
cat Workbook2.csv | node dist/index.js csv html
cat Workbook2.csv | node dist/index.js csv json
cat Workbook2.prn | node dist/index.js prn html
cat Workbook2.prn | node dist/index.js prn json
```

## Run test
```
node dist/test.js
```