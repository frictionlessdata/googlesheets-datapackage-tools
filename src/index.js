import {md5, slugify} from './helper';

global.onOpen = () => {
  SpreadsheetApp
    .getUi()
    .createAddonMenu()
    .addItem('Export data package', 'showExportDialog')
    .addItem('Import data package', 'importDataPackage')
    .addToUi();
};

global.showExportDialog = () => {
  const exportDialog = HtmlService.createHtmlOutputFromFile('exportDialog');
  SpreadsheetApp.getUi().showModalDialog(exportDialog, 'Export data package')
};

global.importDataPackage = () => {
  SpreadsheetApp.getUi().alert('Import (WIP)');
};

global.exportDataPackage = () => {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const packageName = spreadsheet.getName();
  const packageTitle = slugify(packageName);
  const sheets = spreadsheet.getSheets();
  
  const packageDescriptorFileName = 'datapackage.json';
  const packageDescriptor = {
    name: packageName,
    title: packageTitle,
    profile: 'tabular-data-package',
    resources: []
  };

  const folderRoot = DriveApp.createFolder(`${packageTitle}_datapackage`);
  const folderDataName = 'data';
  const folderData = folderRoot.createFolder(folderDataName);

  sheets.forEach(sheet => {
    const resourceTitle = sheet.getName();
    const resourceName = slugify(resourceTitle);
    const resourceFormat = 'csv';
    const resourceFileName = `${resourceName}.${resourceFormat}`;
    
    const csvContent = convertSheetToCSV(sheet);

    const resourceFile = folderData.createFile(resourceFileName, csvContent);

    const resourceDescriptor = {
      name: resourceName,
      path: `${folderDataName}/${resourceFileName}`,
      profile: "tabular-data-resource",
      title: resourceTitle,
      format: resourceFormat,
      mediatype: `text/${resourceFormat}`,
      encoding: 'utf-8',
      bytes: resourceFile.getSize(),
      hash: md5(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, csvContent))
    };
    
    packageDescriptor.resources.push(resourceDescriptor);
  });

  folderRoot.createFile(
    packageDescriptorFileName, 
    JSON.stringify(packageDescriptor, null, 4)
  );
};

const convertSheetToCSV = (sheet) => {
  const data = sheet.getDataRange().getValues();
  return data.map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
};
