"use client";
import PdfComponent from "./pdfComponent";

export default function PDFCreationTestPage() {
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
    const { html, css } = copyElementWithStyles("pdf");
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
            margin-bottom: 70px;
            font-size: 14px;
        }

        .divider-column {
            display: flex;
            flex-direction: column;
            width: 50%;
        }

        .divider-row {
            display: flex;
        }

        .section-title {
            font-size: 20px;
            margin-bottom: 20px;
        }

        .header {
            font-size: 15px;
            white-space: nowrap;
        }

        .data {
            font-size: 14px;
        }

        .section {
            margin-bottom: 50px;
            page-break-inside: avoid;
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
    // send the html to the api
    fetch("/api/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // send the html of the pdf component
      body: JSON.stringify({ data: data }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Download or display the PDF
        const pdfUrl = URL.createObjectURL(blob);
        window.open(pdfUrl);
      });
  }
  return (
    <>
      <div className="text-darkBlue">
        <button onClick={generatePDF}>Generate PDF</button>
        <div>
          <div id="pdf">
            <PdfComponent title="Test Title" text="Test Text" />
          </div>
        </div>
      </div>
    </>
  );
}
