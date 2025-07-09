import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import api from '../lib/axios'






const CreatePage = () => {

  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const Navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.post("/notes", {
        title,
        content,
      })
      toast.success("Note created successfully");
      Navigate("/")
    } catch (error) {
      console.error("Error creating note:", error);
      if (error.response?.status === 429) {
        toast.error("solw down! You are making too many requests.", {duration: 4000, icon: "⚠️"});
      } else {
        toast.error("An error occurred.");
      }
    }
    finally {
      setIsLoading(false);
      setTitle('');
      setContent('');
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link className='btn btn-ghost mb-6' to={"/"}>
            <ArrowLeftIcon className="size-5"/> Back to Notes
          </Link>
          <div className="card bg-base-100 w-[80%] mx-auto shadow-lg">
            <div className="card-body flex flex-col items-center w-full">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4 flex flex-col gap-2">
                  <label className='label'>
                    <span className="label-text">Title</span>
                  </label>
                  <input 
                    type="text"
                    placeholder='Note Title'
                    className='input input-bordered w-md' 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control mb-4 flex flex-col gap-2">
                  <label className='label'>
                    <span className="label-text">Content</span>
                  </label>
                  <textarea 
                    className='textarea textarea-bordered h-32 w-md'
                    placeholder='Write your note here...'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary"  disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
