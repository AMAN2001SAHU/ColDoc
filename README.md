# Real-Time Collaborative Text Editor

This project is a real-time collaborative text editor built with React, Socket.IO, Quill, and Prisma. It allows multiple users to edit a document simultaneously with live updates.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features

- Real-time synchronization of document changes across multiple clients.
- User-friendly text editor with formatting options.
- Automatic saving of document changes at regular intervals.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/AMAN2001SAHU/ColDoc.git
cd ColDoc
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up Prisma and Database:**

```bash
npm install -g prisma
npx prisma migrate dev
npx prisma db seed --preview-feature
```

- Create a .env file and set DATABASE_URL="";

4. **Start the Server:**

```bash
npm run dev
```

## Technologies Used

- **Frontend:**

  - React
  - Quill (Rich Text Editor)
  - React Router
  - Socket.IO Client

- **Backend:**
  - Node.js
  - Socket.IO
  - Prisma (Database ORM)

## Contributing

Contributions are welcome! Here's how you can contribute to this project:

- Fork the repository.
- Create your feature branch (git checkout -b feature/YourFeature).
- Commit your changes (git commit -am 'Add some feature').
- Push to the branch (git push origin feature/YourFeature).
- Open a pull request.
