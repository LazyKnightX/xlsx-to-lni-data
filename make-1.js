const XLSX = require('xlsx')
const LniUtil = require('lni-util')
const jet = require('fs-jetpack')

const workbook = XLSX.readFile('./data-1.xlsx', null)
const Sheet1 = workbook.Sheets.Sheet1

const data = XLSX.utils.sheet_to_json(Sheet1)

const out = {}
data.forEach((row) => {
    let info = {}
    if (row['ENABLE'] == true) {
        const gid = row['PRE'] + row['SYMBOL']
        info.Name = row['NAME1'] + row['NAME2'] + (row['NAME3'] || '')
        info._parent = "ZPsh"
        info.file = row['FILE']
        info.maxScale = row['SCALE-MAX']
        info.minScale = row['SCALE-MIN']
        info.numVar = 1
        info.tilesets = row['TILESETS']
        out[gid] = info
    }
})

const lniText = LniUtil.obj2Lni(out)
jet.write('out-1.ini', lniText)

console.log('done')
