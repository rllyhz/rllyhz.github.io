function createImportExportUI({
  title = '',
  uploadLabel = '',
  uploadResultPreview = '=> Ex: data.json',
  uploadResultClassName = 'upload-result',
  uploadAcceptFileType = '.jpg',
  multipleUpload = false,
  uploadInputClassName = 'upload-file',
  uploadInputNameField = 'upload-file',
  uploadButtonClassName = 'btn-upload-file',
  optionLabel = 'Replacing existing data',
  optionClassName = 'option-data',
  optionNameField = 'option-data',
  btnImportClassName = 'btn-import-data',
  btnExportClassName = 'btn-import-data',
  formBehavior = false,
}) {
  const importExportTitleElem = document.createElement('h3');
  importExportTitleElem.classList.add('import-export-title');
  importExportTitleElem.innerText = title;

  const inputUploadFileElem = document.createElement('input');
  inputUploadFileElem.type = 'file';
  inputUploadFileElem.accept = uploadAcceptFileType;
  inputUploadFileElem.placeholder = uploadInputNameField;
  if (multipleUpload) {
    inputUploadFileElem.setAttribute('multiple', 'multiple');
  }
  inputUploadFileElem.classList.add('input-upload-file');
  inputUploadFileElem.classList.add(uploadInputClassName);
  if (formBehavior) {
    inputUploadFileElem.name = uploadInputNameField;
  }

  const btnUploadProjectsFileElem = document.createElement('button');
  btnUploadProjectsFileElem.type = 'button';
  btnUploadProjectsFileElem.innerText = 'Upload';
  btnUploadProjectsFileElem.classList.add('btn-upload');
  btnUploadProjectsFileElem.classList.add(uploadButtonClassName);

  const uploadLabelElem = document.createElement('p');
  uploadLabelElem.innerText = uploadLabel;
  const uploadResultElem = document.createElement('p');
  uploadResultElem.innerText = uploadResultPreview;
  uploadResultElem.classList.add(uploadResultClassName);
  const previewContainerElem = document.createElement('div');
  previewContainerElem.classList.add('preview-container');
  previewContainerElem.appendChild(uploadLabelElem);
  previewContainerElem.appendChild(uploadResultElem);

  const uploadContainerElem = document.createElement('div');
  uploadContainerElem.classList.add('upload-container');
  uploadContainerElem.appendChild(previewContainerElem);
  uploadContainerElem.appendChild(document.createElement('div'));
  uploadContainerElem.appendChild(inputUploadFileElem);
  uploadContainerElem.appendChild(btnUploadProjectsFileElem);

  const optionLabelElem = document.createElement('p');
  optionLabelElem.innerText = optionLabel;
  const checkedOptionImportElem = document.createElement('input');
  checkedOptionImportElem.type = 'checkbox';
  checkedOptionImportElem.placeholder = optionNameField;
  checkedOptionImportElem.classList.add(optionClassName);
  if (formBehavior) {
    checkedOptionImportElem.name = optionNameField;
  }

  const optionImportContainerElem = document.createElement('div');
  optionImportContainerElem.classList.add('option-import-container');
  optionImportContainerElem.appendChild(optionLabelElem);
  optionImportContainerElem.appendChild(document.createElement('div'));
  optionImportContainerElem.appendChild(checkedOptionImportElem);

  const importContainerElem = document.createElement('div');
  importContainerElem.classList.add('import-container');
  importContainerElem.appendChild(uploadContainerElem);
  importContainerElem.appendChild(optionImportContainerElem);

  const btnImportElem = document.createElement('button');
  if (formBehavior) {
    btnImportElem.type = 'submit';
  } else {
    btnImportElem.type = 'button';
  }
  btnImportElem.innerText = 'Import';
  btnImportElem.classList.add('btn-import');
  btnImportElem.classList.add(btnImportClassName);
  const btnExportElem = document.createElement('button');
  btnExportElem.type = 'button';
  btnExportElem.innerText = 'Export';
  btnExportElem.classList.add('btn-export');
  btnExportElem.classList.add(btnExportClassName);

  const importExportActionContainerElem = document.createElement('div');
  importExportActionContainerElem.classList.add('import-export-action-container');
  importExportActionContainerElem.appendChild(btnExportElem);
  importExportActionContainerElem.appendChild(btnImportElem);

  return [
    importExportTitleElem,
    importContainerElem,
    importExportActionContainerElem
  ];
}