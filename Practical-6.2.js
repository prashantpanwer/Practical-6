
import fs from "fs";
import readline from "readline";
import path from "path";

const inputFile = "data/users.csv";
const outputFile = "out/domains.json";

async function main() {
 fs.mkdirSync(path.dirname(outputFile), { recursive: true });

 if (!fs.existsSync(inputFile)) {
  throw new Error(`❌ Input file not found: ${inputFile}`);
 }

 const domainCounts = {};
 let lineCount = 0;
 const startTime = Date.now();

 console.log("📊 Processing started...");

 const rl = readline.createInterface({
  input: fs.createReadStream(inputFile),
  crlfDelay: Infinity,
 });

 for await (const line of rl) {
  if (lineCount === 0 && line.startsWith("id")) {
   lineCount++;
   continue;
  }

  const [, email] = line.split(",");
  if (!email || !email.includes("@")) continue;

  const domain = email.split("@")[1].trim();
  domainCounts[domain] = (domainCounts[domain] || 0) + 1;

  lineCount++;
  if (lineCount % 1000 === 0) {
   process.stdout.write(`\r🧮 Processed: ${lineCount.toLocaleString()} lines`);
  }
 }

 console.log(`\r✅ Finished processing ${lineCount.toLocaleString()} lines.`);
 console.log("💾 Writing results to", outputFile, "...");

 fs.writeFileSync(outputFile, JSON.stringify(domainCounts, null, 2));
 const duration = ((Date.now() - startTime) / 1000).toFixed(2);
 console.log(`🎉 Done! (${duration}s total) Results in ${outputFile}`);
}

main().catch((err) => console.error(err.message));

=>users.csv
id,email
1,prashant@gmail.com
2,ayush@yahoo.com
3,sunny@gmail.com
4,jatin@outlook.com
5,karan@gmail.com

=>out/domains.json:
{
  "gmail.com": 3,
  "yahoo.com": 1,
  "outlook.com": 1

}
