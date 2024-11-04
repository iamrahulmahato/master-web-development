// console.log("Hi guys testing..");

const generPdf = async function (userName) {
    const { PDFDocument, rgb } = PDFLib;
    const getCertif = await fetch('./certi.pdf').then(function (res) {
        // convert to array
        return res.arrayBuffer();
    });

    // console.log(`Contents in getCertif documnet are:`);
    // console.log(getCertif);

    const docum = await PDFDocument.load(getCertif);
    
    // get pages
    const pages=docum.getPages();   //returns array
    const firstPage=pages[0];
    firstPage.drawText(userName,{
        x:240,
        y:320,
        size:60,
        color: rgb(1.0, 0.0863, 0.3647)
    })
    
    const pdfBytes = await docum.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = URL.createObjectURL(blob);
    console.log(`Generated blob link: ${link}`);

    document.getElementById('getCerti').src = link;
};


document.getElementById('subm').addEventListener("submit",function(){
    event.preventDefault(); // Prevent form submission and page refresh
    let nameUser=document.getElementById('uname').value;
    document.getElementById('getCerti').style.height="100vh";
    generPdf(nameUser)
});