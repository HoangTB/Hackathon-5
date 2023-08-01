import { useState } from "react";
import "./App.css";
import FormStudent from "./components/formStudent";
import TableStudent from "./components/tableStudent";
function App() {
  return (
    <div>
      <FormStudent />
      <TableStudent />
    </div>
  );
}

export default App;
