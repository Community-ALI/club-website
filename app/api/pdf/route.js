import puppeteer from 'puppeteer';


export async function POST(request) {
    const body = await request.json();
    const { data } = body;
    console.log(data);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // make the newpage look like the pdfComponent
    
    await page.setContent(data);

    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, displayHeaderFooter: false, margin:{ top: "2cm"} });    
    await browser.close();

    return new Response(pdfBuffer, {
        headers: { 'Content-Type': 'application/pdf' }
    });
}
