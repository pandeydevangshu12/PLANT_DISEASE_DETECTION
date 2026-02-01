# 🌿 Leaf Doctor

Leaf Doctor is an AI-powered web application that analyzes plant leaf images to identify plant species, detect diseases, and recommend treatments. It uses Google Gemini’s multimodal AI with a serverless Node.js backend to deliver fast and accurate plant health diagnostics.

---

## 🚀 Features

* Image-based plant disease detection
* Plant identification using AI
* Disease analysis and treatment suggestions
* Serverless backend deployed on Vercel
* Secure API key handling with environment variables

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express
* **AI Model:** Google Gemini (Multimodal)
* **Image Processing:** Multer
* **Deployment:** Vercel
* **Version Control:** GitHub

---

## 📂 Project Structure

```
leaf-doctor-backend
│
├── api
│   └── analyze.js
│
├── package.json
├── package-lock.json
└── .gitignore
```

---

## ⚙️ Setup & Deployment

### 1. Upload to GitHub

Upload the project files to a GitHub repository using the GitHub web interface.

### 2. Environment Variables

Add the following environment variable in your deployment platform (Vercel):

```
GEMINI_API_KEY=your_api_key_here
```

> ⚠️ Never commit your API key to GitHub.

### 3. Deploy

Import the GitHub repository into Vercel and deploy. No build command is required.

---

## 🔗 API Endpoint

**POST**

```
/api/analyze
```

### Request

* `plantMedia` (file): Image of the plant leaf

### Response

```json
{
  "analysis": "AI-generated plant disease diagnosis and treatment"
}
```

---

## 🎯 Use Cases

* Farmers and gardeners
* Agricultural students
* Plant disease analysis
* Smart farming applications

---

## 🔮 Future Enhancements

* Multi-language support
* Disease severity detection
* Mobile app integration
* Authentication and rate limiting

---

## 📜 License

This project is open-source and available for educational and research purposes.
