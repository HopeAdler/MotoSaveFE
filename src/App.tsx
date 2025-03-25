import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes";
const App: React.FC = () => {

  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
