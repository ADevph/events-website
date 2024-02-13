import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import PastEvent from './components/PresentEvent';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import EventDetailPage from './components/EventDetailsPage';
import AllEvents from './components/AllEvents';
import Skills from './Pages/Skills';
import SkillsCards from './components/SkillsCards';
import PresentEvent from './components/PresentEvent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><PresentEvent /></div>,
  },
  
  {
    path: "/events/:eventId",
    element: <div><EventDetailPage /></div>,
  },
  

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);