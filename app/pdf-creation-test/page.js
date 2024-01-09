'use client';
import PdfComponent from './pdfComponent';

export default function PDFCreationTestPage() {
    
    function getUniqueSelector(element) {
        if (element.id) {
            return `#${element.id}`;
        } else if (element.className) {
            return `.${element.className.split(' ').join('.')}`;
        } else {
            return element.tagName.toLowerCase();
        }
    }

    function extractStyles(element) {
        var styles = '';
        var computedStyles = window.getComputedStyle(element);
    
        // Generate the selector
        var selector = getUniqueSelector(element);
    
        // Start the CSS rule
        styles += `${selector} {`;
    
        // Add the computed styles
        for (let prop of computedStyles) {
            styles += `${prop}: ${computedStyles.getPropertyValue(prop)}; `;
        }
    
        styles += '} ';
    
        // Process children
        Array.from(element.children).forEach(child => {
            styles += extractStyles(child);
        });
    
        return styles;
    }

    function giveIdToAllElements(element) {
        element.id = Math.random().toString(36).substring(7);
        Array.from(element.children).forEach(child => {
            giveIdToAllElements(child);
        });
    }

    function copyElementWithStyles(elementId) {
        var element = document.getElementById(elementId);
        // give each item in the pdf component a unique id
        giveIdToAllElements(element);
        // change the id of the pdf component to pdf
        element.id = 'pdf';
        // Extract HTML
        var htmlContent = element.outerHTML;
    
        // Extract CSS
        var cssContent = extractStyles(element);
        
        // Return HTML and CSS
        return { html: htmlContent, css: cssContent };
    }

    function generatePDF() {
        // copy the html and css of the pdf component
        const { html, css } = copyElementWithStyles('pdf');
        // this is the html and css of the pdf component
        const data = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                ${css}
            </style>
        </head>
        <body>
            ${html}
        </body>
        </html>
        `
        // send the html to the api
        fetch('/api/pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // send the html of the pdf component
            body: JSON.stringify({ data: data }),
        })
        .then(response => response.blob())
        .then(blob => {
            // Download or display the PDF
            const pdfUrl = URL.createObjectURL(blob);
            window.open(pdfUrl);
        });
    }
    return (
        <>
            <div className="text-darkBlue">
                <button onClick={generatePDF}>Generate PDF</button>
                <div className='hidden'>
                    <div id="pdf">
                        <PdfComponent title="Test Title" text="Test Text" />
                    </div>
                </div>
            </div>
        </>
    );
}
