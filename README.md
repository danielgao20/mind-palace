# Mind Palace

## Project Overview

Mind Palace is a revolutionary personal knowledge management tool that helps users organize, connect, and retain vast amounts of information. Inspired by the need to manage information overload in our daily lives, Mind Palace serves as a digital "second brain," allowing users to effortlessly capture ideas, visualize connections, and discover insights.

## Features

- **Intuitive note-taking**: Effortlessly capture and organize ideas.
- **AI-powered categorization**: Automatically categorize and connect related concepts.
- **Interactive knowledge graph**: Visualize relationships between notes.
- **Advanced search**: Quickly retrieve and uncover connections between pieces of information.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js
- **Database**: MongoDB with vector embeddings
- **AI**: Cerebras AI for natural language processing
- **Visualization**: Vis.js for interactive knowledge graphs

## How to Run

### Frontend

1. Clone the repository and navigate to the `app` folder:
   ```
   cd app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Backend

1. Navigate to the `backend` folder:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the AI processing script for embeddings:
   ```
   python embeddings.py
   ```

4. Start the backend server:
   ```
   node server.js
   ```

## Challenges

- Optimizing vector embeddings within MongoDB for fast retrieval.
- Designing a user-friendly interface for complex knowledge graphs.
- Balancing quick idea capture with comprehensive note-taking.

## Accomplishments

- Seamless transition from note-taking to visualizing connected ideas.
- Advanced AI-driven connections between unrelated concepts.
- User-friendly interface with high-performance query handling.

## Future Plans

- Collaborative features for shared knowledge spaces.
- Mobile app development.
- Productivity tool integrations (e.g., Notion, Evernote).
- Enhanced AI suggestions and privacy features.

## Credits

Mind Palace was built by:
- Helena Zhou
- Ryan Chang
- Daniel Gao
