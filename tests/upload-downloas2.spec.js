const ExcelJs = require('exceljs')

async function excelTest() {

    const workbook = new ExcelJs.Workbook()
    await workbook.xlsx.readFile("C:/Users/Astha IT/Downloads/exceldownloadTest.xlsx")
    const worksheet = workbook.getWorksheet("Sheet1")
    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {
            console.log(cell.value())

        })
    })
}
excelTest()




