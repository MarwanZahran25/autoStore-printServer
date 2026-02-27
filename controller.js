import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import "dotenv/config";
import { print } from "unix-print";
import { createBarcodeFile } from "./helper.js";

const PRINTER_NAME = process.env.PRINTER_NAME || "Xprinter_XP_370B";

export async function handlePrint(req, res) {
  const { id, price, name } = req.body;
  let numberOfcopies = parseInt(req.body.numberOfcopies);
  const barcodeFile = path.join(__dirname, "barcodes", `${id}.jpeg`);

  if (
    typeof numberOfcopies !== "number" ||
    Number.isNaN(numberOfcopies) ||
    numberOfcopies <= 0
  ) {
    numberOfcopies = 1;
  }
  let fileExist = true;
  try {
    await fs.access(barcodeFile);
  } catch {
    fileExist = false;
  }
  if (!fileExist) {
    try {
      await createBarcodeFile(barcodeFile, { id, price, name });

      console.log(`${barcodeFile}file created`);
    } catch (e) {
      res.send("couldn't create the file" + e.message);
    }
  }
  try {
    await print(barcodeFile, PRINTER_NAME, [`-n ${numberOfcopies}`]);
    res.send("print job sent to the printer queue ");
  } catch (e) {
    res.send(e);
  }
}