<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">


# SITMYPET

<em>Connecting Pets and Caregivers Seamlessly, Anytime, Anywhere</em>

<!-- BADGES -->
<img src="https://img.shields.io/github/license/tarekhatib/sitmypet?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
<img src="https://img.shields.io/github/last-commit/tarekhatib/sitmypet?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/tarekhatib/sitmypet?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/tarekhatib/sitmypet?style=flat&color=0080ff" alt="repo-language-count">

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white" alt="Markdown">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/Swift-F05138.svg?style=flat&logo=Swift&logoColor=white" alt="Swift">
<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=black" alt="Prettier">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Passport-34E27A.svg?style=flat&logo=Passport&logoColor=white" alt="Passport">
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/Python-3776AB.svg?style=flat&logo=Python&logoColor=white" alt="Python">
<br>
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat&logo=ts-node&logoColor=white" alt="tsnode">
<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat&logo=Prisma&logoColor=white" alt="Prisma">
<img src="https://img.shields.io/badge/Expo-000020.svg?style=flat&logo=Expo&logoColor=white" alt="Expo">
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
<img src="https://img.shields.io/badge/Podman-892CA0.svg?style=flat&logo=Podman&logoColor=white" alt="Podman">
<img src="https://img.shields.io/badge/Jest-C21325.svg?style=flat&logo=Jest&logoColor=white" alt="Jest">

</div>
<br>

---

## Overview

sitmypet is an all-in-one pet sitting platform that empowers developers to build secure, scalable, and user-friendly pet care applications. It combines a React Native mobile frontend with a robust NestJS backend, supporting role-based features for pet owners and sitters, booking management, profile handling, and location discovery.

**Why sitmypet?**

This project streamlines the development of pet care services with:

- 🧩 **Modular Architecture:** Seamless integration of frontend and backend components for scalable development.
- 🔒 **Secure Authentication:** JWT-based login, role management, and identity verification ensure user security.
- 🎨 **Rich UI Components:** Customizable booking cards, profile views, and nearby profiles enhance user engagement.
- 🗺️ **Location & Discovery:** Location-based search and discovery features connect users with nearby pet sitters.
- 🖼️ **Data & Document Handling:** OCR processing, document uploads, and email notifications support comprehensive workflows.

---

## Features

|      | Component       | Details                                                                                     |
| :--- | :-------------- | :------------------------------------------------------------------------------------------ |
| ⚙️  | **Architecture**  | <ul><li>Monorepo structure with separate backend (NestJS, Prisma, Python scripts) and frontend (React Native, Expo)</li><li>Backend API built with NestJS, leveraging modular architecture</li><li>Client-side mobile app using React Native with Expo</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>TypeScript used extensively for type safety</li><li>ESLint and Prettier configured for code consistency</li><li>Code organized into clear directories: backend, frontend</li></ul> |
| 📄 | **Documentation** | <ul><li>Includes `README.md`, `schema.prisma`, and various JSON configs</li><li>Podfile for iOS dependencies</li><li>Comments and type annotations in codebase</li></ul> |
| 🔌 | **Integrations**  | <ul><li>Backend integrates with Prisma ORM for database access</li><li>Uses AWS SDK (`@aws-sdk/client-s3`) for cloud storage</li><li>Expo modules for device features (image picker, secure store)</li><li>CI/CD tools like Podman, npm scripts</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Backend modules for auth, user, pets, etc., via NestJS modules</li><li>Frontend components modularized with React Native components and hooks</li><li>Separation of concerns between API, UI, and data layers</li></ul> |
| 🧪 | **Testing**       | <ul><li>Uses Jest for unit and end-to-end testing (`jest-e2e.json`)</li><li>Supertest for API testing</li><li>TypeScript support in tests for type safety</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Optimized image handling with `expo-image-picker` and `expo-image-manipulator`</li><li>Efficient state management with React hooks and RxJS</li><li>Build configs (`tsconfig.build.json`) for optimized production bundles</li></ul> |
| 🛡️ | **Security**      | <ul><li>JWT authentication via `@nestjs/jwt` and `passport-jwt`</li><li>Secure storage with `expo-secure-store`</li><li>Entitlements file (`sitmypet.entitlements`) for iOS security features</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Backend: Prisma, NestJS, TypeScript, Python scripts</li><li>Frontend: React Native, Expo, TailwindCSS, various Expo modules</li><li>Dev tools: ESLint, Prettier, Jest, TypeScript, Prisma</li></ul> |

---

## Project Structure

```sh
└── sitmypet/
    ├── README.md
    ├── backend
    │   ├── .gitignore
    │   ├── .prettierrc
    │   ├── README.md
    │   ├── eslint.config.mjs
    │   ├── nest-cli.json
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── prisma
    │   ├── prisma.config.ts
    │   ├── scripts
    │   ├── src
    │   ├── test
    │   ├── tsconfig.build.json
    │   └── tsconfig.json
    ├── frontend
    │   ├── .gitignore
    │   ├── .idea
    │   ├── README.md
    │   ├── app
    │   ├── app.json
    │   ├── assets
    │   ├── babel.config.js
    │   ├── components
    │   ├── config
    │   ├── eslint.config.js
    │   ├── ios
    │   ├── metro.config.js
    │   ├── nativewind-env.d.ts
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── tailwind.config.js
    │   └── tsconfig.json
    ├── package-lock.json
    └── package.json
```

---

### Project Index

<details open>
	<summary><b><code>SITMYPET/</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/README.md'>README.md</a></b></td>
					<td style='padding: 8px;'>- Provides an overview of the pet sitting platforms core functionality, emphasizing role-based features for pet owners and sitters, including booking management, profile handling, and location-based discovery<br>- Serves as a foundational reference for understanding the applications architecture, guiding development, and ensuring alignment across modules to facilitate seamless user experiences and secure interactions within the ecosystem.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Defines project dependencies and development tools, ensuring proper setup and compatibility within the React Native and Expo ecosystem<br>- Facilitates streamlined development by managing core libraries like Expo and image picker, supporting mobile app functionality<br>- Serves as a foundational configuration that aligns the project’s architecture with its dependency management and build processes.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- backend Submodule -->
	<details>
		<summary><b>backend</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ backend</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/.prettierrc'>.prettierrc</a></b></td>
					<td style='padding: 8px;'>- Defines consistent code formatting standards across the backend project by specifying preferences for single quotes and trailing commas<br>- Ensures uniformity in code style, facilitating easier collaboration and maintainability within the overall architecture<br>- This configuration supports the projects goal of maintaining clean, readable, and professional code throughout the development lifecycle.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/README.md'>README.md</a></b></td>
					<td style='padding: 8px;'>- Defines the core structure and configuration for the NestJS backend application, establishing the foundation for scalable server-side development<br>- It orchestrates module setup, dependency injection, and application initialization, ensuring a cohesive architecture that supports efficient API handling, business logic execution, and integration with external services within the overall project ecosystem.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/eslint.config.mjs'>eslint.config.mjs</a></b></td>
					<td style='padding: 8px;'>- Defines ESLint configuration tailored for the backend codebase, integrating recommended linting rules, TypeScript support, and Prettier formatting standards<br>- Ensures code quality, consistency, and adherence to best practices across the project by establishing a unified linting environment aligned with TypeScript and JavaScript standards.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/tsconfig.build.json'>tsconfig.build.json</a></b></td>
					<td style='padding: 8px;'>- Defines build-specific TypeScript configurations by extending the main settings while excluding test and distribution files<br>- Ensures consistent compilation parameters for production builds, streamlining the development workflow and maintaining code quality across the backend project architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Defines the backend service architecture, orchestrating core functionalities such as user authentication, data management, and file handling<br>- Integrates essential modules like Prisma for database interactions, AWS SDK for cloud storage, and Passport for security, ensuring a scalable, secure, and maintainable foundation for the applications server-side operations.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/tsconfig.json'>tsconfig.json</a></b></td>
					<td style='padding: 8px;'>- Defines TypeScript compilation settings for the backend, ensuring consistent, optimized, and type-safe code generation across the project<br>- It facilitates smooth development and deployment workflows by specifying module resolution, target environment, and output configurations, thereby supporting the overall architectures robustness and maintainability.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/nest-cli.json'>nest-cli.json</a></b></td>
					<td style='padding: 8px;'>- Defines the configuration for the NestJS CLI, guiding project scaffolding, source code organization, and compilation behavior within the backend architecture<br>- It ensures consistent code generation aligned with the projects source root and manages build output cleanup, supporting streamlined development and deployment workflows.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/prisma.config.ts'>prisma.config.ts</a></b></td>
					<td style='padding: 8px;'>- Defines and configures the Prisma ORM setup, establishing database connection parameters and migration paths<br>- Facilitates seamless integration between the application and the database by centralizing environment-based configuration, ensuring consistent schema management and data access across the backend architecture<br>- This setup is essential for maintaining reliable database interactions within the overall project structure.</td>
				</tr>
			</table>
			<!-- test Submodule -->
			<details>
				<summary><b>test</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ backend.test</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/test/jest-e2e.json'>jest-e2e.json</a></b></td>
							<td style='padding: 8px;'>- Defines the configuration for end-to-end testing within the project, specifying file extensions, test environment, and transformation rules<br>- Facilitates consistent and reliable execution of e2e tests by guiding the testing framework on how to locate, interpret, and run test specifications, thereby ensuring the integrity and robustness of the overall application architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/test/app.e2e-spec.ts'>app.e2e-spec.ts</a></b></td>
							<td style='padding: 8px;'>- Facilitates end-to-end testing of the applications core endpoint to ensure reliable server responses<br>- Validates that the root URL correctly returns a greeting message, contributing to the overall quality assurance and stability of the backend architecture within the project.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- src Submodule -->
			<details>
				<summary><b>src</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ backend.src</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/app.controller.ts'>app.controller.ts</a></b></td>
							<td style='padding: 8px;'>- Defines the primary API endpoint for the backend application, handling incoming GET requests at the root URL<br>- It delegates the response generation to the application service, facilitating communication between clients and the core business logic within the NestJS architecture<br>- This controller serves as the entry point for basic interactions with the backend system.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/main.ts'>main.ts</a></b></td>
							<td style='padding: 8px;'>- Initializes and configures the backend server, establishing core application settings such as CORS, request parsing limits, and validation rules<br>- Serves as the entry point for the application, orchestrating the startup process and ensuring the server is ready to handle incoming requests within the overall architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/app.module.ts'>app.module.ts</a></b></td>
							<td style='padding: 8px;'>- Defines the core application module that orchestrates the integration of various functional domains such as authentication, user management, contact handling, location services, OCR processing, content posting, and storage<br>- It establishes the foundational structure for the backend, ensuring seamless configuration, dependency management, and coordination across the entire codebase architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/app.service.ts'>app.service.ts</a></b></td>
							<td style='padding: 8px;'>- Provides a foundational service within the backend architecture, delivering a simple greeting endpoint that confirms the applications operational status<br>- It acts as an entry point for verifying server responsiveness and serves as a basis for expanding core functionalities in the NestJS-based application<br>- This component ensures the systems basic health check capability and initial interaction point.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/app.controller.spec.ts'>app.controller.spec.ts</a></b></td>
							<td style='padding: 8px;'>- Defines and verifies the behavior of the main application controller within the backend architecture, ensuring it correctly handles incoming requests and returns expected responses<br>- Serves as a foundational test to validate core functionality, supporting the overall stability and reliability of the applications API layer.</td>
						</tr>
					</table>
					<!-- locations Submodule -->
					<details>
						<summary><b>locations</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.locations</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/locations/locations.module.ts'>locations.module.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the locations module within the backend architecture, orchestrating location-related functionalities<br>- It integrates database access via Prisma, and connects location-specific controllers and services to handle business logic and API endpoints<br>- This module serves as a core component for managing location data, ensuring modularity and seamless interaction within the overall system.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/locations/locations.service.ts'>locations.service.ts</a></b></td>
									<td style='padding: 8px;'>- Provides a service to retrieve and list location data from the database, supporting the overall architecture by enabling efficient access to location information<br>- It integrates with the Prisma ORM to facilitate database interactions, ensuring locations are fetched in an ordered manner, which supports features like location management and display within the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/locations/locations.controller.ts'>locations.controller.ts</a></b></td>
									<td style='padding: 8px;'>- Provides an API endpoint to retrieve all location data within the backend architecture<br>- Serves as a key interface for accessing location information, facilitating integration with other services or frontend components<br>- Ensures streamlined data retrieval from the LocationsService, supporting the overall systems geographic data management and user interaction functionalities.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- prisma Submodule -->
					<details>
						<summary><b>prisma</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.prisma</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/prisma/prisma.service.ts'>prisma.service.ts</a></b></td>
									<td style='padding: 8px;'>- Facilitates database connectivity management within the backend architecture by establishing and terminating connections to the Prisma ORM<br>- Ensures efficient resource handling and stability during application startup and shutdown, serving as the central service for database interactions in the overall system<br>- This setup promotes reliable data access and streamlined lifecycle management across the codebase.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/prisma/prisma.module.ts'>prisma.module.ts</a></b></td>
									<td style='padding: 8px;'>- Establishes a global Prisma module that integrates PrismaService into the NestJS application, enabling seamless database interactions across the backend architecture<br>- It centralizes Prisma client management, promoting consistent and efficient data access throughout the project, and simplifies dependency injection for database operations within various modules.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- posts Submodule -->
					<details>
						<summary><b>posts</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.posts</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/posts/posts.service.ts'>posts.service.ts</a></b></td>
									<td style='padding: 8px;'>- Provides core functionality to retrieve detailed post information, including associated service, owner, pet, and user-specific save status<br>- Facilitates fetching comprehensive post data, calculating owner reviews, and handling not-found scenarios, thereby supporting the applications data access layer within the overall backend architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/posts/posts.controller.ts'>posts.controller.ts</a></b></td>
									<td style='padding: 8px;'>- Provides an API endpoint for retrieving individual post details, ensuring access is secured via JWT authentication<br>- Integrates with the posts service to fetch data specific to the authenticated user, supporting the overall architectures goal of delivering personalized content while maintaining robust security within the backend service layer.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/posts/posts.module.ts'>posts.module.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the posts feature module, orchestrating the integration of database access, request handling, and business logic related to posts within the application<br>- It establishes the core structure for managing post-related operations, ensuring seamless interaction between the controller, service, and database layers to support CRUD functionalities and data consistency across the system.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- auth Submodule -->
					<details>
						<summary><b>auth</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.auth</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/auth/jwt.strategy.ts'>jwt.strategy.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the JWT authentication strategy for the backend, enabling secure user verification through JSON Web Tokens<br>- It extracts and validates tokens from request headers, ensuring that user identity and roles are accurately identified for authorization purposes within the applications architecture<br>- This component is essential for maintaining secure, role-based access control across the system.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/auth/auth.module.ts'>auth.module.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the authentication module within the backend architecture, orchestrating user authentication processes through JWT-based strategies<br>- It integrates user management, email notifications, and security configurations, establishing a core component for secure access control and token management across the application<br>- This module ensures seamless authentication workflows aligned with the overall system security architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/auth/auth.service.ts'>auth.service.ts</a></b></td>
									<td style='padding: 8px;'>- Implements core authentication functionalities, including user registration, login, token management, email verification, and password reset workflows<br>- Facilitates secure user identity verification and session handling within the applications architecture, ensuring robust access control and user account security across the system.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/auth/local.strategy.ts'>local.strategy.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the local authentication strategy for user login, integrating credential validation within the backend authentication flow<br>- It ensures secure and seamless user authentication by handling login requests, contributing to the overall security architecture and user management system of the application<br>- This component is essential for enabling user access control within the broader backend infrastructure.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/auth/auth.controller.ts'>auth.controller.ts</a></b></td>
									<td style='padding: 8px;'>- Defines authentication endpoints for user registration, login, token refresh, email verification, password reset, and logout, facilitating secure user identity management within the application<br>- Serves as the primary interface for handling authentication-related requests, coordinating with the underlying AuthService to implement core security workflows and ensure seamless user access control across the system.</td>
								</tr>
							</table>
							<!-- dto Submodule -->
							<details>
								<summary><b>dto</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.auth.dto</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/auth/dto/refresh.dto.ts'>refresh.dto.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the data transfer object for refresh token requests within the authentication module, ensuring that incoming refresh tokens are validated as strings<br>- It facilitates secure and structured communication during token renewal processes, supporting the overall authentication flow and maintaining the integrity of user session management in the backend architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/auth/dto/login.dto.ts'>login.dto.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the data structure for user login requests within the authentication module, ensuring input validation for email format and password strength<br>- Facilitates secure and consistent handling of login credentials across the backend, supporting the overall authentication flow and user access management in the application architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/auth/dto/verify-password-reset-otp.dto.ts'>verify-password-reset-otp.dto.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the data structure for verifying password reset OTPs within the authentication workflow, ensuring proper validation of email and OTP inputs<br>- Integrates into the broader authentication system to facilitate secure password recovery processes, supporting user identity verification during password reset requests<br>- This DTO enforces input integrity and consistency across the password reset validation steps.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/auth/dto/register.dto.ts'>register.dto.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the data structure for user registration, ensuring input validation for essential fields such as name, email, and password<br>- Serves as a blueprint for capturing and validating new user information within the authentication workflow, facilitating secure and consistent user onboarding across the application.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/auth/dto/verify-email-otp.dto.ts'>verify-email-otp.dto.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the data transfer object for verifying email OTPs within the authentication flow, ensuring input validation for email format and OTP length<br>- It facilitates secure and consistent handling of email verification requests, integrating seamlessly into the broader authentication architecture to support user identity confirmation processes.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/auth/dto/resend-verification.dto.ts'>resend-verification.dto.ts</a></b></td>
											<td style='padding: 8px;'>- Facilitates user account verification by defining the data structure for resending verification emails<br>- Ensures that the provided email address is valid, supporting the authentication workflow within the backend architecture<br>- This component plays a crucial role in maintaining account security and user onboarding processes across the system.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/auth/dto/reset-password.dto.ts'>reset-password.dto.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the data structure for resetting user passwords within the authentication module, ensuring input validation for email, OTP, and new password fields<br>- Facilitates secure and consistent handling of password reset requests across the backend, supporting the overall authentication flow and maintaining data integrity within the applications architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/auth/dto/request-password-reset.dto.ts'>request-password-reset.dto.ts</a></b></td>
											<td style='padding: 8px;'>- Facilitates user-initiated password reset requests by validating email addresses within the authentication workflow<br>- Integrates into the broader authentication architecture to ensure secure and accurate processing of password reset initiations, supporting user account recovery processes and maintaining overall system security and user experience.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- guards Submodule -->
							<details>
								<summary><b>guards</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.auth.guards</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/auth/guards/jwt-auth.guard.ts'>jwt-auth.guard.ts</a></b></td>
											<td style='padding: 8px;'>- Implements a JWT-based authentication guard to secure API endpoints within the backend architecture<br>- It integrates with the NestJS framework and Passport.js to verify user credentials, ensuring that only authenticated users can access protected resources<br>- This guard plays a critical role in maintaining the security and integrity of the applications authentication flow.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/auth/guards/roles.guard.ts'>roles.guard.ts</a></b></td>
											<td style='padding: 8px;'>- Implements role-based access control within the backend architecture by verifying user permissions against required roles for protected endpoints<br>- It integrates with the overall security framework to ensure that only authorized users can access specific functionalities, thereby maintaining the integrity and security of the applications authorization layer.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- email Submodule -->
					<details>
						<summary><b>email</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.email</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/email/email.service.ts'>email.service.ts</a></b></td>
									<td style='padding: 8px;'>- Provides email communication capabilities within the application by managing the sending of verification codes, password reset tokens, and contact form messages<br>- Integrates with SMTP servers to facilitate automated, styled email notifications, supporting user verification, password recovery, and user inquiries, thereby enhancing user engagement and operational responsiveness across the platform.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/email/email.module.ts'>email.module.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the email module within the backend architecture, encapsulating email-related functionalities<br>- It registers the email service as a provider and makes it available for use across other modules, facilitating seamless email communication capabilities throughout the application<br>- This module serves as a foundational component for managing email operations within the overall system.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- sitter Submodule -->
					<details>
						<summary><b>sitter</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.sitter</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/sitter/sitter.controller.ts'>sitter.controller.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the API endpoints for sitter-related functionalities, enabling authenticated users to access personalized home feeds, explore content, manage saved posts, and toggle post saves<br>- Serves as the primary interface between client requests and the underlying business logic within the sitter service, facilitating seamless interaction with user-specific data and content discovery within the application architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/sitter/sitter.module.ts'>sitter.module.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the Sitter module within the backend architecture, integrating core services, controllers, and database interactions related to sitters<br>- Facilitates organized management of sitter-related functionalities, ensuring seamless communication between the application’s business logic and data layer, and supporting scalable, modular development of sitter features within the overall system.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/sitter/sitter.service.ts'>sitter.service.ts</a></b></td>
									<td style='padding: 8px;'>- Provides core services for managing pet sitting operations, including fetching daily schedules, recent client interactions, and exploring available posts<br>- Facilitates user interactions such as saving posts and retrieving personalized content, thereby supporting the platforms primary functions of connecting sitters with pet owners and enabling discovery of relevant services within the applications architecture.</td>
								</tr>
							</table>
							<!-- dto Submodule -->
							<details>
								<summary><b>dto</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.sitter.dto</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/sitter/dto/sitter-home.dto.ts'>sitter-home.dto.ts</a></b></td>
											<td style='padding: 8px;'>- Defines data transfer objects for the sitters home feed, encapsulating key information such as todays bookings, recent client interactions, and nearby service posts<br>- These DTOs structure the data presented on the sitter's dashboard, enabling a cohesive view of daily schedules, client history, and local opportunities within the overall backend architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/sitter/dto/explore-response.dto.ts'>explore-response.dto.ts</a></b></td>
											<td style='padding: 8px;'>- Defines data transfer objects for exploring posts, encapsulating key details such as post information, owner, service, and metadata<br>- Facilitates structured responses for listing and paginating available sitter posts, supporting efficient data exchange and user interface rendering within the applications exploration features<br>- Ensures consistent data format across the backends exploration endpoints.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/sitter/dto/explore-query.dto.ts'>explore-query.dto.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the data transfer object for exploring and filtering sitter options within the application<br>- It encapsulates search criteria such as keywords, services, location, sorting preferences, and pagination, enabling flexible and structured querying of available sitters<br>- This DTO facilitates consistent request handling and supports dynamic filtering in the broader backend architecture.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- users Submodule -->
					<details>
						<summary><b>users</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.users</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/users/users.module.ts'>users.module.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the user management domain within the application, integrating authentication, OCR, and storage functionalities<br>- It orchestrates user-related operations, ensuring seamless interaction between core services and external modules, thereby supporting user account handling, authentication workflows, and associated data processing across the system.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/users/users.controller.ts'>users.controller.ts</a></b></td>
									<td style='padding: 8px;'>- Defines user-related API endpoints for profile management, including retrieving user data, updating profiles, uploading profile images and ID documents, changing passwords, and deleting accounts<br>- Integrates authentication, file validation, and external services for storage and OCR processing, supporting secure and comprehensive user account operations within the applications architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/users/users.service.ts'>users.service.ts</a></b></td>
									<td style='padding: 8px;'>- Provides core user management functionalities within the backend architecture, including user creation, profile updates, role management, authentication token handling, and account security operations<br>- Facilitates seamless integration of user data with related entities like profiles and documents, ensuring secure and consistent user lifecycle management across the application.</td>
								</tr>
							</table>
							<!-- dto Submodule -->
							<details>
								<summary><b>dto</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.users.dto</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/users/dto/delete-account.dto.ts'>delete-account.dto.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the data structure for securely requesting account deletion by validating the users password<br>- Integrates into the user management workflow to ensure proper authentication before account removal, supporting the overall architectures focus on user security and data integrity during sensitive operations.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/users/dto/update-user.dto.ts'>update-user.dto.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the data structure for updating user profiles within the backend system, enabling flexible modifications of user information such as name, email, and location<br>- Integrates validation rules to ensure data integrity, supporting seamless user management and maintaining consistency across the applications user-related operations.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/users/dto/change-password.dto.ts'>change-password.dto.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the data structure for securely capturing and validating user input when changing passwords within the user management module<br>- Ensures that both old and new passwords meet minimum security requirements, facilitating safe password updates and maintaining overall account security in the applications user authentication flow.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- entities Submodule -->
							<details>
								<summary><b>entities</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.users.entities</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/users/entities/user.entity.ts'>user.entity.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the user entity within the backend architecture, establishing the core data structure and relationships for user management<br>- It serves as the foundational model for handling user information, authentication, and authorization processes, ensuring consistency and integrity across the applications user-related functionalities<br>- This entity integrates seamlessly with other modules to support secure and efficient user operations.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- storage Submodule -->
					<details>
						<summary><b>storage</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.storage</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/storage/r2.service.ts'>r2.service.ts</a></b></td>
									<td style='padding: 8px;'>- Provides a service for uploading files to Cloudflare R2 storage, integrating with the applications architecture<br>- Facilitates seamless, programmatic storage of media assets or data files, ensuring efficient management and accessibility within the backend infrastructure<br>- Acts as a core component for handling media uploads, supporting scalable and reliable storage operations across the system.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/storage/storage.module.ts'>storage.module.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the storage module within the backend architecture, encapsulating the R2Service responsible for managing storage-related operations<br>- Serves as a foundational component that integrates storage functionalities into the overall system, enabling seamless access and interaction with storage services across the application<br>- Facilitates modularity and reusability within the backends service layer.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- contact Submodule -->
					<details>
						<summary><b>contact</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.contact</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/contact/contact.module.ts'>contact.module.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the contact management feature within the backend architecture, integrating email functionalities and exposing endpoints for user communication<br>- Facilitates seamless handling of contact-related interactions, ensuring efficient routing and processing of contact requests while maintaining modularity through dependency on the email service<br>- Supports overall user engagement and communication workflows in the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/contact/contact.controller.ts'>contact.controller.ts</a></b></td>
									<td style='padding: 8px;'>- Facilitates user communication by handling contact form submissions and triggering email notifications<br>- Integrates with the email service to ensure messages from users are received and acknowledged, supporting effective user engagement within the applications overall architecture<br>- This component plays a key role in maintaining open communication channels between users and the platform.</td>
								</tr>
							</table>
							<!-- dto Submodule -->
							<details>
								<summary><b>dto</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.contact.dto</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/contact/dto/contact-form.dto.ts'>contact-form.dto.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the data structure for contact form submissions, ensuring validation of user input such as name, email, subject, and message<br>- Serves as a key component in the backend to facilitate secure and consistent handling of contact requests, integrating with the overall architecture to support user communication workflows and data integrity.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- ocr Submodule -->
					<details>
						<summary><b>ocr</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.ocr</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/ocr/ocr.controller.spec.ts'>ocr.controller.spec.ts</a></b></td>
									<td style='padding: 8px;'>- Defines and verifies the OCR controllers interface within the backend architecture, ensuring proper integration with the OCR service<br>- Serves as a foundational test to confirm the controllers availability and readiness to handle OCR-related requests, supporting the overall system's ability to process and manage optical character recognition tasks effectively.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/ocr/ocr.controller.ts'>ocr.controller.ts</a></b></td>
									<td style='padding: 8px;'>- Provides API endpoints for authenticated users to upload documents for optical character recognition (OCR) processing and to check the status of their OCR verification<br>- Integrates with the OCR service to handle file uploads and retrieve processing status, supporting seamless user interactions within the applications architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/ocr/ocr.service.ts'>ocr.service.ts</a></b></td>
									<td style='padding: 8px;'>- Facilitates the upload, processing, and verification of identity documents through OCR, integrating with storage and database services<br>- It extracts text from images or PDFs, classifies document types, updates user profiles, and manages verification statuses, enabling seamless identity validation within the applications architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/ocr/ocr.service.spec.ts'>ocr.service.spec.ts</a></b></td>
									<td style='padding: 8px;'>- Provides unit tests for the OCR service, ensuring core functionalities are correctly implemented within the backend architecture<br>- It verifies that the OCR service is properly instantiated and integrated with dependencies, supporting reliable text extraction processes essential for the applications document processing capabilities<br>- This testing layer helps maintain robustness and stability in the overall system.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/ocr/ocr.module.ts'>ocr.module.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the OCR module within the backend architecture, integrating core services and dependencies necessary for optical character recognition functionalities<br>- It orchestrates the OCR processing flow by connecting the OCR controller with data storage and database layers, enabling seamless handling of OCR tasks and ensuring modular, maintainable architecture for text extraction features.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- common Submodule -->
					<details>
						<summary><b>common</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.common</b></code>
							<!-- decorators Submodule -->
							<details>
								<summary><b>decorators</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.common.decorators</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/src/common/decorators/roles.decorator.ts'>roles.decorator.ts</a></b></td>
											<td style='padding: 8px;'>- Defines a constant key used for role-based access control within the applications authorization system<br>- It facilitates the association of user roles with specific endpoints or functionalities, supporting the implementation of role-based decorators across the backend architecture to enforce security and permissions consistently.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- prisma Submodule -->
			<details>
				<summary><b>prisma</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ backend.prisma</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/prisma/seed-sitter-data.ts'>seed-sitter-data.ts</a></b></td>
							<td style='padding: 8px;'>- Seed-sitter-data.tsThis script initializes the database with sample data related to sitters and their nearby pet care posts<br>- It primarily serves to seed the database with realistic, diverse entries for testing and development purposes, ensuring that the applications data layer is populated with meaningful content<br>- This facilitates comprehensive testing of features such as pet sitting listings, location-based searches, and user interactions within the broader backend architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/prisma/seed-locations.ts'>seed-locations.ts</a></b></td>
							<td style='padding: 8px;'>- Seeds the database with a comprehensive list of Lebanese cities, establishing location data essential for geographic referencing within the application<br>- Ensures each city is uniquely represented, facilitating accurate location-based features and queries across the systems architecture<br>- This foundational data supports functionalities that depend on regional distinctions and enhances user experience through localized content.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/prisma/seed-services.ts'>seed-services.ts</a></b></td>
							<td style='padding: 8px;'>- Seeds core service options into the database to support the applications service catalog<br>- Ensures that essential pet care services such as dog walking, grooming, and health care are available for user bookings and interactions<br>- Maintains data integrity by clearing dependent records before populating the service list, facilitating consistent and reliable application operation.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/prisma/seed-posts.ts'>seed-posts.ts</a></b></td>
							<td style='padding: 8px;'>- Seeds the database with sample pet service posts, establishing initial data for development and testing<br>- Ensures the presence of an owner and pet, then creates diverse posts linked to existing services, facilitating realistic interactions within the applications marketplace for pet care services.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/prisma/schema.prisma'>schema.prisma</a></b></td>
							<td style='padding: 8px;'>- Defines the data schema for a pet care platform, modeling users, pets, bookings, posts, reviews, and related entities<br>- Establishes relationships and constraints to support functionalities like user profiles, pet management, service offerings, booking workflows, and content sharing, forming the backbone of the applications data architecture.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- scripts Submodule -->
			<details>
				<summary><b>scripts</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ backend.scripts</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/backend/scripts/ocr.py'>ocr.py</a></b></td>
							<td style='padding: 8px;'>- Performs optical character recognition (OCR) on input images or PDFs by preprocessing visual data to enhance text extraction accuracy<br>- Integrates image resizing, denoising, and thresholding techniques to optimize input quality before leveraging Tesseract for multilingual text extraction<br>- Supports PDF conversion when PyMuPDF is available, contributing to the broader document processing architecture within the project.</td>
						</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<!-- frontend Submodule -->
	<details>
		<summary><b>frontend</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ frontend</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/nativewind-env.d.ts'>nativewind-env.d.ts</a></b></td>
					<td style='padding: 8px;'>- Establishes type declarations for NativeWind within the project, ensuring seamless integration and type safety across the frontend codebase<br>- Facilitates consistent styling and component development by referencing NativeWinds type definitions, thereby supporting a cohesive and maintainable architecture in the React Native environment.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/babel.config.js'>babel.config.js</a></b></td>
					<td style='padding: 8px;'>- Configures Babel to optimize JavaScript transpilation for the React Native project, ensuring compatibility with Expo and NativeWind styling<br>- It integrates essential presets and plugins to support advanced animations and styling features, facilitating a seamless development experience and consistent code transformation aligned with the overall architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/README.md'>README.md</a></b></td>
					<td style='padding: 8px;'>- Provides foundational setup and guidance for developing, running, and customizing an Expo-based mobile application<br>- It facilitates project initialization, dependency management, and platform-specific testing, ensuring a streamlined development experience within a unified architecture<br>- This README supports onboarding and ongoing development by offering essential instructions and resources for building cross-platform apps with Expo.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app.json'>app.json</a></b></td>
					<td style='padding: 8px;'>- Defines the app configuration for the SitMyPet mobile application, establishing core parameters such as platform support, visual branding, and integration with Expo plugins<br>- It ensures consistent app behavior across iOS, Android, and web, facilitating seamless deployment and user experience within the overall architecture of the cross-platform, React Native-based project.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/tailwind.config.js'>tailwind.config.js</a></b></td>
					<td style='padding: 8px;'>- Defines the Tailwind CSS configuration for the project, specifying which files are scanned for class usage and integrating nativewind presets<br>- This setup ensures consistent styling across the applications frontend components and supports seamless styling integration within the overall architecture<br>- It plays a crucial role in maintaining a cohesive visual design and efficient styling workflow.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/eslint.config.js'>eslint.config.js</a></b></td>
					<td style='padding: 8px;'>- Defines ESLint configuration for the frontend project, ensuring code quality and consistency aligned with Expo standards<br>- Integrates Expos linting rules while excluding distribution files, supporting a streamlined development process within the overall architecture<br>- Facilitates maintainable and error-free code across the React Native-based frontend, contributing to the projects robust and scalable structure.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/metro.config.js'>metro.config.js</a></b></td>
					<td style='padding: 8px;'>- Configures the Metro bundler for the frontend project, integrating native wind styling support and specifying global CSS input<br>- Ensures seamless styling and asset management within the React Native environment, aligning the build process with the projects architecture for consistent and efficient development.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Defines the entry point and configuration for the frontend mobile application, orchestrating navigation, dependencies, and build scripts within the overall architecture<br>- Facilitates seamless user interaction and access to core features, serving as the foundation for the app’s user interface and integration with backend services in the project.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/tsconfig.json'>tsconfig.json</a></b></td>
					<td style='padding: 8px;'>- Defines TypeScript configuration settings for the frontend project, ensuring strict type safety and consistent module resolution across the codebase<br>- It facilitates seamless development by standardizing compiler options and path aliases, supporting maintainability and scalability within the overall architecture of the React Native and Expo-based application.</td>
				</tr>
			</table>
			<!-- ios Submodule -->
			<details>
				<summary><b>ios</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ frontend.ios</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/ios/Podfile.properties.json'>Podfile.properties.json</a></b></td>
							<td style='padding: 8px;'>- Defines configuration properties for the iOS platform within the project, specifying the JavaScript engine as Hermes, enabling network inspection for development, and activating the new architecture<br>- These settings optimize the apps performance, debugging capabilities, and architecture features, ensuring seamless integration and enhanced development experience in the overall project architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/ios/Podfile'>Podfile</a></b></td>
							<td style='padding: 8px;'>- Defines the iOS dependency configuration for the React Native project, orchestrating native module linking, framework integration, and build settings<br>- Ensures seamless integration of Expo modules, React Native components, and platform-specific optimizations, facilitating a robust and maintainable iOS build environment aligned with project requirements and architecture.</td>
						</tr>
					</table>
					<!-- sitmypet Submodule -->
					<details>
						<summary><b>sitmypet</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.ios.sitmypet</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/ios/sitmypet/AppDelegate.swift'>AppDelegate.swift</a></b></td>
									<td style='padding: 8px;'>- Sets up the iOS application lifecycle for a React Native-based Expo project, integrating native iOS functionalities with React Native components<br>- Manages app launch, deep linking, and universal links, while configuring the React Native bridge and bundle source, ensuring seamless communication between native iOS features and the React Native framework within the overall architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/ios/sitmypet/sitmypet.entitlements'>sitmypet.entitlements</a></b></td>
									<td style='padding: 8px;'>- Defines the entitlements configuration for the iOS version of the SitMyPet app, establishing permissions and capabilities for the application within the Apple ecosystem<br>- It integrates into the overall project architecture by ensuring compliance with platform requirements and enabling features necessary for app deployment and functionality on iOS devices.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/ios/sitmypet/sitmypet-Bridging-Header.h'>sitmypet-Bridging-Header.h</a></b></td>
									<td style='padding: 8px;'>- Facilitates interoperability between Swift and Objective-C by exposing public headers to the Swift codebase within the iOS frontend of the sitmypet project<br>- It enables seamless integration of legacy or third-party Objective-C components, ensuring smooth communication and functionality sharing across different programming languages in the app architecture.</td>
								</tr>
							</table>
							<!-- Images.xcassets Submodule -->
							<details>
								<summary><b>Images.xcassets</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.ios.sitmypet.Images.xcassets</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/ios/sitmypet/Images.xcassets/Contents.json'>Contents.json</a></b></td>
											<td style='padding: 8px;'>- Defines the metadata for image assets within the iOS frontend of the project, facilitating organized management and integration of visual resources<br>- It ensures proper asset cataloging and compatibility with the app’s user interface, supporting seamless visual rendering across different device configurations within the overall mobile architecture.</td>
										</tr>
									</table>
									<!-- SplashScreenBackground.colorset Submodule -->
									<details>
										<summary><b>SplashScreenBackground.colorset</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.ios.sitmypet.Images.xcassets.SplashScreenBackground.colorset</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/ios/sitmypet/Images.xcassets/SplashScreenBackground.colorset/Contents.json'>Contents.json</a></b></td>
													<td style='padding: 8px;'>- Defines color assets for the iOS splash screen background, ensuring visual consistency across light and dark modes within the apps overall architecture<br>- Facilitates seamless theming by specifying universal and appearance-specific colors, contributing to a polished user experience during app launch.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- SplashScreenLogo.imageset Submodule -->
									<details>
										<summary><b>SplashScreenLogo.imageset</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.ios.sitmypet.Images.xcassets.SplashScreenLogo.imageset</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/ios/sitmypet/Images.xcassets/SplashScreenLogo.imageset/Contents.json'>Contents.json</a></b></td>
													<td style='padding: 8px;'>- Defines the splash screen logo assets for the iOS version of the application, ensuring consistent branding across different device resolutions<br>- Integrates seamlessly into the overall app architecture by providing the visual identity displayed during app launch, contributing to a polished user experience and brand recognition within the mobile interface.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- AppIcon.appiconset Submodule -->
									<details>
										<summary><b>AppIcon.appiconset</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.ios.sitmypet.Images.xcassets.AppIcon.appiconset</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/ios/sitmypet/Images.xcassets/AppIcon.appiconset/Contents.json'>Contents.json</a></b></td>
													<td style='padding: 8px;'>- Defines the app icon assets for the iOS platform within the project, ensuring consistent branding and visual identity across devices<br>- Integrates seamlessly into the overall architecture by providing necessary image specifications for app store submission and device display, supporting a polished user experience and maintaining visual standards across the mobile application.</td>
												</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- config Submodule -->
			<details>
				<summary><b>config</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ frontend.config</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/config/backConfig.ts'>backConfig.ts</a></b></td>
							<td style='padding: 8px;'>- Defines the backend server URL for the frontend application, establishing the connection point for API requests during development<br>- Serves as a centralized configuration to facilitate seamless communication between the frontend and backend services within the overall architecture<br>- Ensures flexibility in switching environments by updating the backend path as needed.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/config/api.ts'>api.ts</a></b></td>
							<td style='padding: 8px;'>- Facilitates secure and seamless communication between the frontend and backend by managing API requests with automatic token refresh and error handling<br>- Ensures authenticated interactions through token validation, refresh logic, and session management, maintaining a consistent user experience across the application’s architecture.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- components Submodule -->
			<details>
				<summary><b>components</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ frontend.components</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/components/TodaysBookingCardLoading.tsx'>TodaysBookingCardLoading.tsx</a></b></td>
							<td style='padding: 8px;'>- Provides a loading placeholder component for todays booking card within the frontend architecture<br>- It visually simulates the booking card layout with animated shimmer effects, enhancing user experience during data fetches<br>- This component ensures consistent UI feedback, maintaining aesthetic coherence and responsiveness across the applications booking interface.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/components/ClientHistoryCard.tsx'>ClientHistoryCard.tsx</a></b></td>
							<td style='padding: 8px;'>- Displays individual client history entries by rendering a profile image and first name, facilitating quick visual recognition within the client management interface<br>- Integrates seamlessly into the broader frontend architecture, supporting user engagement and personalized client interactions through a clean, reusable component.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/components/TodaysBookingCard.tsx'>TodaysBookingCard.tsx</a></b></td>
							<td style='padding: 8px;'>- Provides a visual representation of a scheduled booking for today, displaying key details such as owner information, pet name, service type, location, and time<br>- Integrates user images and icons to enhance clarity, supporting the overall user interface by offering a clear, concise snapshot of upcoming appointments within the apps booking management architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/components/CustomDropdown.tsx'>CustomDropdown.tsx</a></b></td>
							<td style='padding: 8px;'>- Implements a customizable dropdown component for mobile interfaces, enabling users to select options from a list with a visually appealing blurred background<br>- Integrates modal overlays and touch interactions to enhance user experience, serving as a reusable UI element within the broader application architecture to facilitate consistent and accessible selection inputs across various screens.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/components/CustomDropdownProfile.tsx'>CustomDropdownProfile.tsx</a></b></td>
							<td style='padding: 8px;'>- Implements a customizable dropdown component for user profile settings, enabling selection from a list of options with a visually appealing blurred background<br>- Integrates modal-based UI for seamless option browsing and selection, contributing to an intuitive and polished user experience within the overall mobile application architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/components/OwnerNearYouCard.tsx'>OwnerNearYouCard.tsx</a></b></td>
							<td style='padding: 8px;'>- Provides a reusable React Native component that displays a profile card for nearby pet owners, highlighting their ratings, location, and services offered<br>- It integrates visual elements like images and icons to create an engaging user interface, supporting the apps goal of connecting users with local pet care providers within the broader architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/components/SitterNearYouCard.tsx'>SitterNearYouCard.tsx</a></b></td>
							<td style='padding: 8px;'>- Provides a reusable card component for displaying nearby sitter profiles within the mobile app<br>- It showcases key details such as images, ratings, location, service type, and duration, while enabling users to save or unsave profiles<br>- Integrates navigation to detailed sitter pages and manages user interactions, contributing to the apps user engagement and profile browsing architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/components/SitterNearYouCardLoading.tsx'>SitterNearYouCardLoading.tsx</a></b></td>
							<td style='padding: 8px;'>- Provides a loading placeholder component for displaying animated skeletons of sitter profile cards within the mobile applications user interface<br>- It enhances user experience by visually indicating content loading states, maintaining layout consistency, and ensuring smooth visual feedback during data fetch operations in the overall app architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/components/ClientHistoryCardLoading.tsx'>ClientHistoryCardLoading.tsx</a></b></td>
							<td style='padding: 8px;'>- Provides a loading placeholder component for client history cards within the React Native frontend, enhancing user experience during data fetches<br>- It visually indicates ongoing content loading, maintaining layout consistency and responsiveness in the client interface, thereby supporting seamless interaction flow within the overall application architecture.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- app Submodule -->
			<details>
				<summary><b>app</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ frontend.app</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/sitterNearYou.tsx'>sitterNearYou.tsx</a></b></td>
							<td style='padding: 8px;'>- Displays a list of nearby sitters by fetching real-time data from the backend, providing users with relevant options based on location<br>- Incorporates loading states for improved user experience and renders individual sitter cards with detailed information, supporting seamless browsing within the apps home screen<br>- This component is central to connecting users with local sitters efficiently.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/todaysBookings.tsx'>todaysBookings.tsx</a></b></td>
							<td style='padding: 8px;'>- Displays todays bookings for pet sitting services by fetching data from the backend and rendering individual booking cards<br>- Manages loading states with placeholders to enhance user experience and integrates seamlessly within the apps overall architecture to provide real-time scheduling information<br>- Facilitates quick access to upcoming appointments, supporting efficient pet care management.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/termsAndConditions.tsx'>termsAndConditions.tsx</a></b></td>
							<td style='padding: 8px;'>- Defines the Terms of Service screen for the SitMyPet mobile app, presenting users with comprehensive legal and usage guidelines<br>- It ensures users understand their responsibilities, platform policies, and legal protections, thereby supporting transparent and compliant interactions between pet owners and sitters within the app’s architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/contactPage.tsx'>contactPage.tsx</a></b></td>
							<td style='padding: 8px;'>- Facilitates user communication by providing a contact form interface within the app<br>- Enables users to submit inquiries or messages, which are then sent to the backend API for processing<br>- Upon successful submission, displays a confirmation message, enhancing user engagement and support accessibility within the overall app architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/privacyPolicy.tsx'>privacyPolicy.tsx</a></b></td>
							<td style='padding: 8px;'>- Provides a comprehensive Privacy Policy interface within the mobile app, outlining data collection, usage, sharing practices, and user rights<br>- It ensures transparency and compliance with privacy standards, enhancing user trust and safeguarding personal information in the overall application architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/index.tsx'>index.tsx</a></b></td>
							<td style='padding: 8px;'>- Handles initial user authentication by verifying stored access tokens and redirecting users to appropriate screens based on login status, ensuring seamless navigation flow within the apps architecture<br>- It acts as an entry point that determines whether users are directed to the main interface or the sign-in page, maintaining secure and efficient user session management.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/recentClients.tsx'>recentClients.tsx</a></b></td>
							<td style='padding: 8px;'>- Displays a list of recent clients with their profile images, names, locations, and last booking dates, sorted by recency<br>- Integrates with backend API to fetch and present current booking data, providing users with an up-to-date overview of todays client interactions within the apps overall architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/notifications.tsx'>notifications.tsx</a></b></td>
							<td style='padding: 8px;'>- Provides the user interface for managing notifications within the app, displaying inbox messages and reviews<br>- It organizes recent interactions, including messages and reviews, with options to view all, enhancing user engagement and awareness of ongoing communications<br>- This component integrates visual elements and navigation controls to facilitate seamless notification exploration.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/_layout.tsx'>_layout.tsx</a></b></td>
							<td style='padding: 8px;'>- Defines the primary layout and navigation structure for the mobile application, orchestrating screen transitions and custom headers across various sections<br>- Facilitates seamless user experience by managing header visibility and back navigation, ensuring consistent styling and behavior within the apps overall architecture<br>- Acts as the central routing hub for key user flows and informational pages.</td>
						</tr>
					</table>
					<!-- (tabs) Submodule -->
					<details>
						<summary><b>(tabs)</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.app.(tabs)</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(tabs)/explore.tsx'>explore.tsx</a></b></td>
									<td style='padding: 8px;'>- The <code>explore.tsx</code> file serves as the core component for the Explore feature within the application's frontend architecture<br>- It orchestrates the display of nearby service providers (sitters), enabling users to discover, filter, and sort available options based on criteria such as location, ratings, and services<br>- This component manages user interactions, fetches relevant data from the backend API, and renders dynamic lists of sitters, contributing to the user-centric exploration experience<br>- Overall, it plays a pivotal role in facilitating intuitive discovery and engagement within the app's broader service marketplace ecosystem.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(tabs)/saved.tsx'>saved.tsx</a></b></td>
									<td style='padding: 8px;'>- Displays and manages the users saved posts within the app, enabling retrieval, visualization, and removal of saved sitter profiles<br>- Integrates with backend APIs to fetch data dynamically, updates the UI accordingly, and ensures a seamless experience for users to access their preferred listings<br>- Serves as a key component for personalized content curation in the overall app architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(tabs)/_layout.tsx'>_layout.tsx</a></b></td>
									<td style='padding: 8px;'>- Defines the bottom tab navigation layout for the app, enabling seamless switching between core sections such as Home, Explore, Saved, and Profile<br>- Implements a visually appealing, platform-adaptive tab bar with animated indicators and role-based iconography, ensuring a consistent and engaging user experience across iOS and Android devices within the overall app architecture.</td>
								</tr>
							</table>
							<!-- (home) Submodule -->
							<details>
								<summary><b>(home)</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.app.(tabs).(home)</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(tabs)/(home)/ownerNearYou.tsx'>ownerNearYou.tsx</a></b></td>
											<td style='padding: 8px;'>- Displays a vertically scrollable list of owner profiles near the user, facilitating discovery within the apps location-based matching feature<br>- Integrates individual owner cards to showcase relevant information, supporting the overall architectures goal of connecting users with nearby owners efficiently and enhancing user engagement through intuitive navigation.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(tabs)/(home)/sitter.tsx'>sitter.tsx</a></b></td>
											<td style='padding: 8px;'>- Provides the main dashboard interface for sitters, aggregating and displaying personalized data such as todays bookings, recent client interactions, and nearby job opportunities<br>- Facilitates seamless navigation and data refreshes, enabling sitters to efficiently manage their schedule, connect with clients, and stay informed about relevant opportunities within the overall app architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(tabs)/(home)/index.tsx'>index.tsx</a></b></td>
											<td style='padding: 8px;'>- Routes users to role-specific interfaces based on stored user role information<br>- It verifies the users role from secure storage and redirects to either the owner or sitter view, ensuring appropriate access control and personalized navigation within the apps architecture<br>- This component facilitates seamless user experience by dynamically directing users to relevant sections upon app launch.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(tabs)/(home)/owner.tsx'>owner.tsx</a></b></td>
											<td style='padding: 8px;'>- Provides the main user interface for pet owners, displaying personalized greetings, todays bookings, pet sitters history, and nearby sitters<br>- Facilitates navigation to detailed views and encourages engagement through browsing options, while dynamically reflecting data availability to enhance user experience within the apps architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(tabs)/(home)/_layout.tsx'>_layout.tsx</a></b></td>
											<td style='padding: 8px;'>- Defines the primary layout and navigation structure for the home section of the application, managing the presentation of different user roles and screens<br>- Sets consistent header styling and controls visibility for specific sub-screens, facilitating seamless user transitions within the app’s main interface<br>- Integrates with the routing system to support role-based content rendering.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- (profile) Submodule -->
							<details>
								<summary><b>(profile)</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.app.(tabs).(profile)</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(tabs)/(profile)/myDocuments.tsx'>myDocuments.tsx</a></b></td>
											<td style='padding: 8px;'>- Provides a placeholder interface for the users document management section within the profile tab<br>- It serves as a foundational component for displaying and interacting with user documents, integrating into the overall app architecture to support personalized content access and management features<br>- This component is designed for future expansion to handle document-related functionalities.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(tabs)/(profile)/editProfile.tsx'>editProfile.tsx</a></b></td>
											<td style='padding: 8px;'>- Facilitates user profile editing by enabling updates to personal details, profile image, and location within the app<br>- Integrates image selection, form handling, and API communication to ensure seamless profile customization<br>- Supports real-time data fetching and validation, contributing to a personalized user experience aligned with the overall app architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(tabs)/(profile)/index.tsx'>index.tsx</a></b></td>
											<td style='padding: 8px;'>- Provides the user profile interface within the app, enabling viewing and editing personal details, accessing support resources, managing account settings, and handling logout or account deletion actions<br>- Integrates user data retrieval, secure token management, and navigation to related screens, forming a central hub for user account management and support within the overall app architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(tabs)/(profile)/changePassword.tsx'>changePassword.tsx</a></b></td>
											<td style='padding: 8px;'>- Facilitates secure password updates within the user profile section by providing an interface for entering and confirming the old and new passwords<br>- Ensures validation, communicates with the backend API to change credentials, and displays success or error feedback<br>- Integrates seamlessly into the overall architecture to enhance user account management and security.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(tabs)/(profile)/_layout.tsx'>_layout.tsx</a></b></td>
											<td style='padding: 8px;'>- Defines the layout and navigation structure for the user profile section, managing screen transitions and custom headers for profile-related pages such as password change, document management, and profile editing<br>- Facilitates consistent header styling and back navigation, ensuring a cohesive user experience within the profile module of the application.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- posts Submodule -->
					<details>
						<summary><b>posts</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.app.posts</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/posts/[postId].tsx'>[postId].tsx</a></b></td>
									<td style='padding: 8px;'>- Displays detailed information for a specific post, including images, owner and pet details, location, service type, and user interactions such as saving or applying<br>- Integrates data fetching and state management to present dynamic content, supporting user engagement within the apps post browsing and interaction architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/posts/_layout.tsx'>_layout.tsx</a></b></td>
									<td style='padding: 8px;'>- Defines the layout and navigation structure for individual post screens within the application, enabling seamless user transitions and consistent header presentation<br>- Facilitates a cohesive user experience by providing a customized header with a back button and title, ensuring clarity when viewing detailed job posts within the broader app architecture.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- (auth) Submodule -->
					<details>
						<summary><b>(auth)</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.app.(auth)</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(auth)/signup.tsx'>signup.tsx</a></b></td>
									<td style='padding: 8px;'>- Facilitates user registration by capturing personal details, validating input, and submitting data to the backend API<br>- Manages user consent, handles loading states, and stores user information securely for subsequent authentication steps<br>- Integrates seamlessly into the overall authentication flow, enabling new users to create accounts and proceed to email verification within the app’s onboarding architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(auth)/signin.tsx'>signin.tsx</a></b></td>
									<td style='padding: 8px;'>- Handles user authentication by providing a login interface, validating credentials, and managing secure storage of user data and tokens<br>- Integrates with backend API for authentication, navigates users based on login status, and offers pathways for password recovery and registration<br>- Serves as the entry point for authenticated user sessions within the app’s architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(auth)/homeAuth.tsx'>homeAuth.tsx</a></b></td>
									<td style='padding: 8px;'>- Facilitates user role selection between Pet Owner and Pet Sitter within the authentication flow, enabling personalized onboarding and navigation<br>- Integrates secure storage for role persistence and directs users to the main application interface based on their chosen role, supporting a tailored experience aligned with the overall app architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(auth)/uploadDocument.tsx'>uploadDocument.tsx</a></b></td>
									<td style='padding: 8px;'>- Facilitates user identity verification by enabling document upload and validation within the onboarding flow<br>- Handles document selection, uploads to OCR API for verification, and manages user progression based on verification status<br>- Integrates seamlessly into the authentication architecture, ensuring secure and user-friendly profile verification before advancing to subsequent steps.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(auth)/uploadPFP.tsx'>uploadPFP.tsx</a></b></td>
									<td style='padding: 8px;'>- Facilitates user profile personalization by enabling image selection and upload for profile pictures within the app<br>- Integrates media permissions, image handling, and server communication to update user avatars, enhancing the onboarding experience<br>- Serves as a key component in the user profile management architecture, ensuring seamless and user-friendly profile customization.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(auth)/verifyEmail.tsx'>verifyEmail.tsx</a></b></td>
									<td style='padding: 8px;'>- Implements email verification via OTP within the authentication flow, enabling users to confirm their email addresses securely<br>- Manages OTP input, handles verification requests, and facilitates OTP resending with cooldowns<br>- Integrates seamlessly with the broader authentication architecture, guiding users through email validation before granting access or progressing to subsequent onboarding steps.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(auth)/verifyPasswordReset.tsx'>verifyPasswordReset.tsx</a></b></td>
									<td style='padding: 8px;'>- Facilitates OTP verification during password reset by capturing user input, managing resend timing, and validating OTPs through API interactions<br>- Integrates seamlessly into the authentication flow, enabling secure email-based password recovery and ensuring a smooth user experience within the overall authentication architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(auth)/resetPassword.tsx'>resetPassword.tsx</a></b></td>
									<td style='padding: 8px;'>- Facilitates user password reset by capturing new password inputs, validating them, and communicating with the backend API to update credentials<br>- Retrieves stored email and OTP tokens for verification, ensuring secure and seamless password recovery within the authentication flow<br>- Integrates with the app’s navigation and secure storage mechanisms to enhance user account security.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(auth)/forgotPassword.tsx'>forgotPassword.tsx</a></b></td>
									<td style='padding: 8px;'>- Facilitates user-initiated password reset requests within the authentication flow by capturing email input, triggering backend API calls to initiate password reset, and navigating users to verification screens<br>- Integrates seamlessly into the authentication architecture, supporting secure handling of reset tokens and enhancing user account recovery processes.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/tarekhatib/sitmypet/blob/master/frontend/app/(auth)/_layout.tsx'>_layout.tsx</a></b></td>
									<td style='padding: 8px;'>- Defines the authentication flow layout within the app, managing navigation and header presentation across various auth-related screens<br>- It orchestrates user transitions between sign-in, sign-up, password reset, and profile completion, ensuring consistent header styling and back navigation, thereby supporting a cohesive user onboarding and authentication experience within the overall app architecture.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---

## 🔮 Future Enhancements

- In-app chat between owners and sitters
- Push notifications
- Payment & payouts
- Availability calendar for sitters
- Advanced verification system
- Personalized recommendations
