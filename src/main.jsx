import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import PastEvent from './components/PastEvent';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import EventDetailPage from './components/EventDetailsPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><PastEvent /></div>,
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