
document.addEventListener('DOMContentLoaded', function () {
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.7.570/pdf.worker.js";

    const pdfFileInput = document.getElementById('pdfFile');
    const convertButton = document.getElementById('convertButton');
    const output = document.getElementById('output');

    convertButton.addEventListener('click', convertToText);
});

async function convertToText() {
    const pdfFileInput = document.getElementById('pdfFile');
    const output = document.getElementById('output');

    if (!pdfFileInput.files.length) {
        output.textContent = 'Please select a PDF file.';
        return;
    }

    const file = pdfFileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function (e) {
        const pdfData = new Uint8Array(e.target.result);
        const text = await extractTextFromPDF(pdfData);
        output.textContent = text;
    };

    reader.readAsArrayBuffer(file);
}

async function extractTextFromPDF(pdfData) {
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    const text = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        content.items.forEach((item) => {
            text.push(item.str);
        });
    }

    return text.join('\n');
}
