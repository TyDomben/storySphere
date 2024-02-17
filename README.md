StorySphere
===========

StorySphere is a dynamic web application for storytelling enthusiasts, enabling users to craft, share, and discover interactive stories enriched with multimedia elements. Designed for writers, educators, and anyone passionate about storytelling, StorySphere fosters a vibrant community around digital narratives.

Tech Stack
----------

- Frontend: React.js, Redux, Material-UI
- Backend: Node.js, Express
- Database: PostgreSQL
- Authentication: Passport
- Cloud Services: Cloudinary
- Development Tools: Git, Webpack, Babel
- Testing: Jest, React Testing Library

Installation
------------

Ensure Node.js, npm, and PostgreSQL are installed on your system.

1. Clone the repository:

    `git clone https://github.com/your-username/StorySphere.git`

2. Navigate to the project directory:

    `cd StorySphere`

3. Install dependencies:

    `npm install`

4. Set up environment variables by creating a `.env` file based on `.env.example`.
5. Initialize the database by executing the SQL commands provided in `database/schema.sql`.
6. Start the server (port 5001):

    `npm run start`

7. Launch the frontend (port 5173) in a new terminal window:

    `npm run dev`

8. Access the application by visiting `http://localhost:5173` in your browser.

Usage
-----

After launching the application, users can sign up or log in to start creating and sharing their interactive stories. Explore the gallery to view stories from the community and use the creation tools to make your stories engaging and interactive.

Contributing
------------

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -am 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

Credits
-------

- Lead Developer: Ty Domben

License
-------

This project is licensed under the MIT License
