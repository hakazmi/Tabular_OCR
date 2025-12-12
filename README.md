# 📄 Tabular OCR Automation System  
### Convert Bank Statements, Payslips, Medical Reports & PDFs into Clean Excel Files

This project is an end-to-end **Tabular OCR system** built using **HunYuan-VL OCR**, **FastAPI**, **Google Colab**, **Ngrok**, and a **React Frontend**.  
It allows users to upload **images or PDFs**, extract **high-accuracy OCR text**, convert it into **structured Excel**, and download the processed file.

---

## 🚀 Features

- ✔️ High-accuracy OCR using **HunYuan-VL**
- ✔️ Converts OCR text → **Excel (.xlsx)**
- ✔️ FastAPI backend
- ✔️ Ngrok tunneling for live API URL
- ✔️ React + TypeScript frontend
- ✔️ Supports Images (JPG/PNG) + PDFs
- ✔️ Download processed Excel file
- ✔️ Works smoothly with Google Colab + VS Code

---


---

# 💡 How It Works (System Flow)

### **1️⃣ Load OCR Model**
- Clone the project 
- The backend loads the **HunYuan-VL OCR** model by running all cells of google colab step wise  , which can extract:
- Text  
- Tables  
- Handwritten content  
- Document structure  

---

### **2️⃣ Convert OCR → Excel**
- A custom Python function:
- Cleans OCR output  
- Detects table rows/columns  
- Structures key-value pairs  
- Builds a clean **Excel file** using OpenPyXL  

---

### **3️⃣ FastAPI Backend**
- The backend exposes endpoints:

| Endpoint | Description |
|----------|-------------|
| `POST /upload` | Upload image/PDF → OCR → Excel |
| `GET /download/{file_id}` | Download converted Excel |

---

### **4️⃣ Ngrok Public URL**

- Ngrok generates a public URL like:
- https://abcd1234.ngrok-free.app
- Paste this URL into the frontend at this path project\src\components\FileUpload.tsx.

---

### **5️⃣ React Frontend**
- Upload file  
- File sent to backend through Ngrok  
- OCR + Excel conversion runs  
- Frontend shows a **Download Excel** button  

---

### 💻 Frontend Setup (React + TypeScript)
1. **Install node modules**
   ```bash
   cd frontend
   npm install
   ```
2. **Update Backend URL**

- Open: project\src\components\FileUpload.tsx.
- And update: const API_URL = 'https://8581a2fb9278.ngrok-free.app';

3. **Start the frontend**
```bash
npm run dev
```
### 🎯 Usage Guide

- Open the React App

- Upload an image or PDF

- Backend performs OCR using HunYuan-VL

- Backend converts the OCR result into Excel

- Click Download Excel to save the output





