# Printer Server

A Node.js Express server for generating and printing product barcode labels. This application receives product information via HTTP requests, generates barcode images with product details, and sends them to a thermal printer.

## Features

- **Barcode Generation**: Creates EAN-13 compatible barcode images using `jsbarcode`
- **Product Label Printing**: Prints labels with product name, barcode, and price
- **Duplicate Printing**: Supports printing multiple copies of the same label
- **Caching**: Stores generated barcodes to avoid regeneration
- **Thermal Printer Support**: Compatible with Xprinter thermal printers

## Prerequisites

- Node.js (ES modules supported)
- Thermal printer (configured via environment variable)
- Unix-based system with printing capabilities

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your printer:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your printer name:
   ```
   PRINTER_NAME=Your_Printer_Name
   ```
   To find your printer name, run: `lpstat -p`

## Usage

Start the server:
```bash
npm start
```

### API Endpoint

**POST /** - Print product barcode

**Request Body:**
```json
{
  "id": "6971536926468",
  "price": "25.00",
  "name": "Product Name",
  "numberOfcopies": 2
}
```

**Parameters:**
- `id` (required): Product ID/barcode number
- `price` (required): Product price
- `name` (required): Product name
- `numberOfcopies` (optional): Number of labels to print (default: 1)

## How It Works

1. **Request Handling**: The server receives product data via POST request
2. **Barcode Generation**: If the barcode doesn't exist, `helper.js` creates a 190x125px JPEG label containing:
   - Product name at the top
   - EAN-13 barcode in the center
   - Price at the bottom
3. **Caching**: Generated barcodes are saved to `barcodes/` directory for future use
4. **Printing**: The `unix-print` library sends the image to the thermal printer

## File Structure

```
printerServer/
├── controller.js       # Main request handler and printing logic
├── helper.js          # Barcode generation utilities
├── barcodes/          # Generated barcode images (auto-generated)
├── .env.example       # Environment variable template
├── package.json       # Dependencies and scripts
└── .gitignore        # Git ignore rules
```

## Dependencies

- **express**: Web server framework
- **jsbarcode**: Barcode generation library
- **canvas**: Node.js canvas implementation for image creation
- **unix-print**: Cross-platform printing utility
- **cors**: Cross-origin resource sharing middleware
- **dotenv**: Environment variable management

## License

ISC
