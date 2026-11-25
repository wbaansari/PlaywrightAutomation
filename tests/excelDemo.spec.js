const ExcelJs = require('exceljs')
const {test, expect} = require('@playwright/test');

async function writeExcel(searchText,replaceText,change,filePath) 
{
    
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    //row will help to iterate and rowNumber will help to find which row 
    const output = await readExcel(worksheet,searchText);

    //To overwrite a cell value
    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

// This does no async work, so don't mark it async.
function readExcel(worksheet,searchText) 
{
    let output = {row:-1, column:-1};
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            
            if(cell.value == searchText)
            {
                //console.log(cell.value);
                //console.log(rowNumber,colNumber);
                output.row = rowNumber;
                output.column = colNumber;
            }
            
        })
    }) 
    return output;   
}

//Update Ansari in the place of Apple
writeExcel("Mango",344,{rowChange:0,colChange:2},"C:/Users/wbaan/Downloads/excelTest.xlsx");

test('Upload Download Excel Validation',async ({page}) =>
{
    const textSearch = 'Mango';
    const updateValue = '786';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
    await downloadPromise;
    writeExcel(textSearch,updateValue,{rowChange:0,colChange:2},"C:/Users/wbaan/Downloads/download.xlsx");
    //await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/wbaan/Downloads/download.xlsx");
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
})
