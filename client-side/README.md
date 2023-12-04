

# LifeFlow

## Overview

This project is a blood donation management system designed to facilitate the process of blood donation. It accommodates three distinct user roles: User, Admin, and Volunteer, each with specific access levels and functionalities within the system.

## User Roles

1. **User:**
   - Can create, delete, and manage their own donation requests.
   - Access is limited to managing personal data.

2. **Admin:**
   - Can create, delete, and manage donation requests for all users.
   - Additionally manages blogs.

3. **Volunteer:**
   - Executes tasks assigned by Admin.
   - Has the ability to create blogs but lacks management privileges.

## Features

- **Donation Request Management:**
  - Users and Admin can create and delete donation requests.
  - Admin has control over all donation requests.

- **Blog Management:**
  - Admin has complete control over blogs (create, edit, delete).
  - Volunteers can create blogs but cannot manage them.

- **Public Access:**
  - Unregistered/anonymous users can search for donors and read blogs without authentication.

## Technologies Used

| Frontend      | Backend       | Others              |
|---------------|---------------|---------------------|
| React.js      | Node.js       | JWT (JSON Web Tokens) |
| Material-UI   | Express.js    |                     |
| Axios         | MongoDB       |                     |
| React Hook Form|              |                     |

## Live Demo

- [https://blood-donation-site-93773.web.app](#) <!-- Replace '#' with your live demo URL -->

## Default Admin Credentials

For initial access to the admin dashboard, use the following credentials:

- **Email:** ricky@ponting.com
- **Password:** [ricky@ponting.com]


## Getting Started

To set up and run the project locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `yarn install` in both the client and server directories.
4. Configure environment variables.
5. Start the server using `yarn start`.
6. Run the client-side application using `yarn start`.

## Contributors

- Mostak Ahmed [mostak.ahm263@gmail.com]



