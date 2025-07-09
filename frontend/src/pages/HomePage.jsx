import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/navbar'
import { RateLimitedUI } from '../components/RateLimitedUI.jsx';
import toast from 'react-hot-toast';
import FooterBar from '../components/Footer.jsx';
import NoteCard from '../components/NoteCard.jsx';
import api from '../lib/axios.js';
import NotesNotFound from '../components/NotesNotFound.jsx';



const Homepage = () => {



  // Fix state initialization
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      console.log("Fetching notes...");
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false)
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response?.status === 429) {
          console.error("Rate limit exceeded");
          setIsRateLimited(true);
        }
        else {
          toast.error("An error occurred while fetching notes:", error);
        }
      }
      finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar />
      {isRateLimited ? <RateLimitedUI /> : (<></>)}

      <div className='max-w-7xl mx-auto px-4 py-6'>
        {loading && <div className="text-Center text-primary py-10">Loading notes</div>}
        {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
      <FooterBar />
    </div>
  )
}

export default Homepage

