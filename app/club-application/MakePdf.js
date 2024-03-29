"use client";
import PdfComponent from "../utils/pdfComponent";


function getUniqueSelector(element) {
  if (element.id) {
    return `#${element.id}`;
  } else if (element.className) {
    return `.${element.className.split(" ").join(".")}`;
  } else {
    return element.tagName.toLowerCase();
  }
}

function extractStyles(element) {
  var styles = "";
  var computedStyles = window.getComputedStyle(element);

  // Generate the selector
  var selector = getUniqueSelector(element);

  // Start the CSS rule
  styles += `${selector} {`;

  // Add the computed styles
  for (let prop of computedStyles) {
    styles += `${prop}: ${computedStyles.getPropertyValue(prop)}; `;
  }

  styles += "} ";

  // Process children
  Array.from(element.children).forEach((child) => {
    styles += extractStyles(child);
  });

  return styles;
}

function giveIdToAllElements(element) {
  element.id = Math.random().toString(36).substring(7);
  Array.from(element.children).forEach((child) => {
    giveIdToAllElements(child);
  });
}

function copyElementWithStyles(elementId) {
  var element = document.getElementById(elementId);
  // give each item in the pdf component a unique id
  giveIdToAllElements(element);
  // change the id of the pdf component to pdf
  element.id = "pdf";
  // Extract HTML
  var htmlContent = element.outerHTML;

  // Extract CSS
  var cssContent = extractStyles(element);

  // Return HTML and CSS
  return { html: htmlContent, css: cssContent };
}

function generatePDF() {
  // copy the html and css of the pdf component
  const { html, css } = copyElementWithStyles("pdf"); //FIXME: we no longer need the css, so extracting it is just extra work for the browser
  // this is the html and css of the pdf component
  const data = `
      <!DOCTYPE html>
      <head>

      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
      </head>
      <body>
      
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

      *{
          font-family: "Roboto";
          color: black;
          margin: 0px;
          padding: 0px;
      }

      .pdf {
          padding: 0px 60px;
      }

      h1 {
          text-align: center;
          margin-bottom: 20px;
          background-color: #d1d1d1;
          padding-top: 10px;
          padding-bottom: 10px;
      }

      .date {
          text-align: center;
          font-size: 14px;
          margin-bottom: 30px;
      }

      .container {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 6px;
          margin-bottom: 20px;
          page-break-inside: avoid;
      }

      .agreement {
          margin-top: 10px;
          margin-bottom: 30px;
          font-size: 14px;
          page-break-inside: avoid;
      }

      .placeholder {
          font-size: 14px;
          margin-bottom: 50px;
      }

      .divider-column {
          display: flex;
          flex-direction: column;
          width: 50%;
      }

      .divider-row {
          display: flex;
          margin-bottom: 20px;
      }

      .section-title {
          font-size: 20px;
          margin-bottom: 20px;
      }

      .section-line {
          border-width: 1px;
          border-color: #363636;
      }

      .header {
          font-size: 15px;
          white-space: nowrap;
      }

      .data {
          font-size: 14px;
          cursor: default;
          text-decoration: none;
      }

      .section {
          page-break-inside: avoid;
          margin-top: 20px;
      }

      .info {
          page-break-inside: avoid;
          margin-top: 20px;
          margin-bottom: 40px;
      }

      .footer {
          text-align: center;
          font-size: 14px;
          background-color: #d1d1d1;
          padding-top: 15px;
          padding-bottom: 10px;
          margin-top: 40px;
      }

      .author {
          padding-top: 10px;
          padding-bottom: 10px;
      }
      </style>
          ${html}
      </body>
      </html>
      `;
  // return html
  return data ;
}

function PDFCreationComponent(props) {

  return ( // this is an invisible component, and is used to send the html and css of the pdf component to the api
    <>
      <div style={{ display: "none" }}>
        <div>
          <div id="pdf">
            <PdfComponent form={props.jsonObject} />
          </div>
        </div>
      </div>
    </>
  );
}


//export the component and the function to generate the pdf
export { PDFCreationComponent, generatePDF };