import { Routes, Route, Navigate } from "react-router";
import Homepage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetail from "./pages/NoteDetailPage";
import toast from "react-hot-toast";

const App = () => {




  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
