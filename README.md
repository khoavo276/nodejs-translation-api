# Japanese to English Translation API

A text translation API from Japanese to English using the open-google-translator library.

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

## Running the Application

```bash
node index.js
```

## Using the API

### 1. Translate Text
**Endpoint:** POST /translate

**Request Body:**
```json
{
    "text": "こんにちは"
}
```

**Response:**
```json
{
    "originalText": "こんにちは",
    "translatedText": "Hello"
}
```

### 2. Get Supported Languages
**Endpoint:** GET /languages

**Response:**
```json
{
    "languages": [
        "en",
        "ja",
        "vi",
        // ... list of other languages
    ]
}
```

## Notes

- This API uses the open-google-translator library, a free library based on Google Translate
- No API key or credentials configuration required
- Supports multiple languages
- Can translate multiple texts simultaneously 