import JsBarcode from "jsbarcode";
import fs from "node:fs";
import { createCanvas } from "canvas";

export async function createBarcodeFile(path, productObj) {
  return new Promise((resolve, reject) => {
    try {
      const outerCanvas = createCanvas(190, 125);
      const barcodeCanvas = createCanvas();
      JsBarcode(barcodeCanvas, `p${productObj.id}`, {
        height: 40,
        fontSize: "10px",
        width: 1,
        text: productObj.id,
      });
      const outerCtx = outerCanvas.getContext("2d");
      outerCtx.fillStyle = "white";
      outerCtx.fillRect(0, 0, 380, 250);
      outerCtx.font = "10px sans-serif";

      outerCtx.fillStyle = "black";
      outerCtx.fillText(`${productObj.name}`, 10, 25);
      outerCtx.drawImage(barcodeCanvas, 20, 30);
      outerCtx.font = "11px";
      outerCtx.fillText(`price : ${productObj.price} QR`, 60, 110);

      const stream = outerCanvas.createJPEGStream();
      const out = fs.createWriteStream(path);
      stream.pipe(out);
      out.on("finish", () => resolve(path));
      out.on("error", (e) => reject(e.message));
    } catch (e) {
      reject(e);
    }
  });
}
