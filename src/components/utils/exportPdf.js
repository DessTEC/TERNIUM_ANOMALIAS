import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";

export async function exportMultipleChartsToPdf(chartsIdArray) {
    const doc = new jsPDF("p", "px");

    let elements = [];
    for(let i=0; i < chartsIdArray.length; i++){
        elements.push(document.getElementById(chartsIdArray[i]));
    }

    const elementCharts= Array.prototype.slice.call(elements)
    console.log(elementCharts)

    await creatPdf( doc, elementCharts );

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    doc.save(`reporte-${dateTime}.pdf`);
}

async function creatPdf(doc,elements) {

  const padding = 10;
  const marginTop = 20;
  let top = marginTop;
  

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const imgData = await htmlToImage.toPng(el);

    let elHeight = el.offsetHeight;
    let elWidth = el.offsetWidth;

    const pageWidth = doc.internal.pageSize.getWidth();

    if (elWidth > pageWidth) {
      const ratio = pageWidth / elWidth;
      elHeight = elHeight * ratio - padding * 2;
      elWidth = elWidth * ratio - padding * 2;
    }

    const pageHeight = doc.internal.pageSize.getHeight();

    if (top + elHeight > pageHeight) {
      doc.addPage();
      top = marginTop;
    }

    doc.addImage(imgData, "PNG", padding, top, elWidth, elHeight, `image${i}`);
    top += elHeight + marginTop;
  }
}