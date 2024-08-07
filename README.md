# Kitchen Rescue

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Overview

Kitchen Rescue is a web application designed to simplify cooking and grocery management for busy individuals, particularly international students. Born out of real struggles with forgotten groceries, recipe searches, and meal planning, Kitchen Rescue provides a seamless experience to track groceries, generate meal ideas, and manage cooking efficiently.

## Key Features

- **AI-Powered Recipe Generation**: Uses OpenAI’s API to generate personalized recipes based on your specified ingredients, dietary restrictions, cuisine preferences, cooking time, and number of people.
- **Smart Pantry Tracking**: Keeps track of your groceries with a user-specific inventory system, updated in real-time using Firebase's Firestore.
- **GPT Vision Magic**: Recognizes groceries from a photo, automatically updating your inventory with item details and quantities.
- **Insightful Dashboard**: Provides a dynamic pie chart to visualize ingredient quantities and stocking levels, helping you make informed decisions about your pantry.

## Tech Stack

- **Next.js**: Framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Material UI**: React component library for stylish and accessible design.
- **OpenAI (GPT & Vision APIs)**: AI tools for recipe generation and image recognition.
- **Google Firebase**: Backend services for real-time database management and user authentication.

## Live Demo

Explore the app in action [here](https://kitchenrescue.vercel.app/).

## Getting Started

To run Kitchen Rescue locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/kitchen-rescue.git
    ```
2. Navigate to the project directory:
    ```bash
    cd kitchen-rescue
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Create a `.env.local` file and add your Firebase and OpenAI API keys.
5. Start the development server:
    ```bash
    npm run dev
    ```

## Contributing

We welcome contributions! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for checking out Kitchen Rescue. We hope it makes your cooking and grocery management experience better!
