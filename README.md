# BillSplitr - Smart Bill Splitting

BillSplitr is a modern, intuitive web application designed to make splitting expenses with friends, family, or colleagues effortless and fair. Built with Next.js, ShadCN UI, and Tailwind CSS, it provides a seamless user experience for tracking group expenses. The app also features an AI-powered summary to give you intelligent insights into your group's spending habits.

![BillSplitr Screenshot](https://picsum.photos/1200/600?grayscale&blur=2)

## ✨ Features

- **Participant Management:** Easily add or remove participants in your group.
- **Expense Logging:** Log expenses with descriptions, amounts, and who paid.
- **Real-time Settlement Calculation:** Instantly see who owes whom to settle up debts.
- **AI-Powered Summaries:** Get intelligent analysis of spending patterns and budgeting advice using Google's Gemini models through Genkit.
- **Currency Selection:** Switch between major currencies (USD, EUR, INR).
- **Export to CSV:** Download a summary of all expenses and settlements.
- **Sleek & Responsive UI:** A beautiful and modern interface built with ShadCN UI and Tailwind CSS.
- **Light & Dark Mode:** Switch between light and dark themes to suit your preference.
- **Persistent Sessions:** Your data is saved in your browser's local storage, so you can pick up where you left off.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    - Create a new file named `.env` in the root of your project.
    - This project uses Google's Gemini for its AI features. You will need a Gemini API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    - Add your API key to the `.env` file:
      ```
      GEMINI_API_KEY=your_google_gemini_api_key_here
      ```
    - **Important:** Do not commit your `.env` file to version control.

### Running the Application

This project uses Genkit to manage the AI flows and Next.js for the frontend. You'll need to run both concurrently.

1.  **Start the Genkit server (in a separate terminal):**
    This server runs the AI models and makes them available to your Next.js application.
    ```bash
    npm run genkit:dev
    ```

2.  **Start the Next.js development server (in another terminal):**
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 🛠️ Built With

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **AI Integration:** [Genkit (Google)](https://firebase.google.com/docs/genkit)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

## ✍️ Author

- **[Your Name Here]** - [Your Website/GitHub Link Here]
