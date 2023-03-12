import { Handler } from "@netlify/functions";
import chromium from "chrome-aws-lambda";

const handler: Handler = async (event) => {
  const executablePath = await chromium.executablePath;

  const browser = await chromium.puppeteer.launch({
    args: await chromium.args,
    executablePath: executablePath || process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(`https://google.com`);
  console.log(await page.content());

  return {
    statusCode: 200,
  };
};

export { handler };
