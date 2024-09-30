# [Food Explorer App &#8599;](https://node-bites.vercel.app/)

The Food Explorer App is a React-based application that allows users to explore various meal categories, view meals within those categories, and see detailed information about selected meals. The app utilizes a visual node graph to represent the exploration process, making it intuitive and engaging.

![node-bites-social-media-preview-img](https://github.com/user-attachments/assets/2e4a84b2-a231-4521-9c5e-1c3233810639)

## Features

- **Explore Meals:** Start from a central node and navigate through categories and meals.
- **Visual Node Graph:** Interact with a dynamic node graph representing meal categories and their associated meals.
- **Meal Details:** View detailed information about individual meals, including ingredients and instructions.
- **Loading State:** Show loading indicators while fetching data to improve user experience.

## Technologies Used

- **React:** For building the user interface.
- **TypeScript:** For type safety and better development experience.
- **React Flow:** For visualizing the node graph.
- **Context API:** For state management across components.
- **Vite:** For fast development and build tooling.
- **Tailwind CSS:** For styling.

## Folder Structure
```
src/
│
├── components/
│   ├── NodeGraph.tsx
│   ├── Sidebar.tsx
│   └── CustomNode.tsx
│
├── api/
│   ├── mealAPI.ts
│
├── hooks/
│   └── useMealData.ts
│
├── utils/
│   └── nodeUtils.ts
│
├── constants/
│   └── constants.ts
│ 
├── tyeps/
│   └── types.ts
│
├── App.tsx
├── index.tsx
└── main.tsx
```
## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (version 14 or later)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/Somu050600/node-bites.git
cd node-bites
npm install
npm run dev
```
