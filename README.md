# Drink API Server

This project is an API server for managing drinks and their ingredients. It is built using Node.js, Express, and Sequelize with SQLite as the database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Migrations](#database-migrations)
- [Future Improvement Areas](#future-improvement-areas)

## Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:GreenMonkeySaveEarth/zeewee-backend.git
	 ```
2. Install dependencies:
	```npm install```
3. Set up environment variables: Create a `.env` file in the root directory and add the following:
	```
	PORT=4000
	NODE_ENV=local
	DB_STORAGE=/Users/XXXX/Documents/zeewee-db <--place to put the SQLite file>
	```

## Usage
1. Build the project:
	```npm run build```

2. Start the server:
	```	npm start```

3. The server will be running at http://localhost:4000.
## API Endpoints
### Drinks
- GET `GET /api/search?index=<number>&limit=<number>&query=<string>`: Get a list paginated of drinks.
- GET `/api/detail?id=UUID`: Get details of a specific drink.

## Database Migrations
1. Run migrations:
	```npm run migrate:up```
2. Undo migrations:
	```npm run migrate:undo```
3. Seed the database:
	```npm run migrate:seed:up```
4. Undo seed:
	```	npm run migrate:seed:undo```

## Future Improvement Areas
1. Add authentication and authorization:
	- Implement JWT (JSON Web Token) for secure authentication.
	- Use middleware to protect routes and ensure only authenticated users can access certain endpoints.
	- Integrate role-based access control (RBAC) to manage permissions for different user roles.

2. Optimize database queries and indexing:
	- Analyze and identify slow queries using tools like Sequelize's logging or database-specific profiling tools.
	- Add appropriate indexes to frequently queried columns to speed up read operations.
	- Optimize query structures and use Sequelize's query optimization features.

3. Caching:
	- Implement caching on the query level using in-memory stores like Redis to reduce database load.
	- Cache frequently accessed data and set appropriate expiration times to ensure data freshness.
	- Use cache invalidation strategies to keep the cache consistent with the database.

4. Feature Flag:
	- Integrate with third-party feature flag services such as LaunchDarkly to manage feature rollouts.
	- Use feature flags to enable or disable features without deploying new code.
	- Implement a strategy for gradual feature rollouts and A/B testing.

5. Server Side Rendering (SSR):
	- Implement SSR to improve initial page load times and enhance SEO.
	- Use frameworks like Next.js or Nuxt.js to facilitate SSR in your application.
	- Optimize server-rendered pages by minimizing the amount of JavaScript sent to the client.
	- Implement caching strategies for server-rendered pages to reduce server load and improve response times.
	- Ensure that SSR pages are properly hydrated on the client side to maintain interactivity.

6. Tracking:
	- Integrate with third-party monitoring and tracking services such as NewRelic to monitor application performance.
	- Set up custom metrics and alerts to track key performance indicators (KPIs) and detect anomalies.
	- Use distributed tracing to gain insights into request flows and identify performance bottlenecks.

7. Add more comprehensive error handling:
	- Implement a global error handling middleware to catch and handle errors consistently.
	- Use structured error responses to provide meaningful error messages to clients.
	- Log errors with sufficient context to facilitate debugging and issue resolution.

8. Improve test coverage and add integration tests:
	- Write unit tests for functions to ensure they work as expected.
	- Add integration tests to verify the interactions between different parts of the system.
	- Use test coverage tools to identify untested code paths and improve overall test coverage.

9. Notifications
	- Integrate with communication tools like Slack to receive instant notifications for any issues on the API server.
	- Configure appropriate error levels to ensure critical issues are promptly addressed.




