import React from 'react';
import puppeteer from 'puppeteer';
import ReactDOM from 'react-dom';
import PdfComponent from '../../pdf-creation-test/pdfComponent';

export async function POST(request) {
    const body = await request.json();
    const { data } = body;
    console.log(data);
    const title = 'default';
    const text = 'default';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // make the newpage look like the pdfComponent
    
    await page.setContent(data);

    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    return new Response(pdfBuffer, {
        headers: { 'Content-Type': 'application/pdf' }
    });
}
