const fs = require("fs");
const path = require("path");

const compiledData = fs.readFileSync(__dirname + "/compiled.js", "utf-8");
const startIndex = compiledData.indexOf("=") + 1;
const parsedData = JSON.parse(compiledData.slice(startIndex));

for (const filePath in parsedData.files) {
    const fileContents = parsedData.files[filePath];
    const fullPath = path.join(__dirname, filePath);
    const directoryPath = path.dirname(fullPath);

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    fs.writeFileSync(fullPath, fileContents, "utf-8");
    console.log(`Created file: ${fullPath}`);
}

console.log(`Created ${Object.keys(parsedData.files).length} files.`);
