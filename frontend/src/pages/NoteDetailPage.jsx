import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router';
import axios from "axios";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    setSaving(true);

    try {
      const res = await axios.put(`http://localhost:5001/api/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      setNote(res.data);
      navigate("/");
      toast.success("Note updated successfully");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !note) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className='animate-spin size-10' />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" /> Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline" disabled={saving}>
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100 shadow-lg flex flex-col items-center w-[80%] mx-auto">
            <div className="card-body">
              <div className="flex flex-col form-control mb-4">
                <label className='label'>
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder='Note Title'
                  className='input input-bordered w-md'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4 flex flex-col gap-2">
                <label className='label'>
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className='textarea textarea-bordered h-32 w-md'
                  placeholder='Write your note here...'
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>
              <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary"  disabled={saving} onClick={handleSave}>
                    {saving ? 'Saving...' : 'Save Note'}
                  </button>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
};

export default NoteDetailPage;
