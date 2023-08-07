import { useState, useEffect } from 'react'
import { Cloudinary } from "@cloudinary/url-gen";
import UploadWidget from './UploadWidget';

export default function NewBlahg() {
  const [blahgs, setBlahgs] = useState([])
  const [foundBlahg, setFoundBlahg] = useState(null)
  const [blahg, setBlahg] = useState({
    title: '',
    author: '',
    category: '',
    text: '',
    image: ''
  })
  const handleChange = (evt) => {
    setBlahg({ ...blahg, [evt.target.name]: evt.target.value })
  }

  // index
  const getNewBlahgs = async () => {
    try {
      const response = await fetch('/api/blahgs')
      const data = await response.json()
      setBlahgs(data)
    } catch (error) {
      console.error(error)
    }
  }
  // delete
  const deleteNewBlahg = async (id) => {
    try {
      const response = await fetch(`/api/blahgs/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setFoundBlahg(data)
    } catch (error) {
      console.error(error)
    }
  }
  // update
  const updateNewBlahg = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/blahgs/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedData })
      })
      const data = await response.json() 
      const blahgsCopy = [...blahgs]
      const index = blahgsCopy.findIndex(blahg => id === blahg._id)
      blahgsCopy[index] = { ...blahgsCopy[index], ...updatedData }
      setBlahgs(blahgsCopy)
    } catch (error) {
      console.error(error)
    }
  }
  // create
  const createNewBlahg = async () => {
    try {
      const response = await fetch(`/api/blahgs`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...blahg })
      })
      const data = await response.json()
      setFoundBlahg(data)
      setBlahg({
          title: '',
          author: '',
          category: '',
          text: '',
          image: ''
 })
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    getNewBlahgs()
  }, [foundBlahg])


  const [url, updateUrl] = useState(false);
 
  const [error, updateError] = useState();
  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true
      });
      return;
    }
    console.dir(result);
    updateUrl(result?.info?.secure_url);
    console.dir(url);
    setBlahg({
     title: '',
     author: '',
     category: '',
     text: '',
     image: result?.info?.secure_url

  })
}

  return (
    <>
    <UploadWidget onUpload={handleOnUpload}>
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <button onClick={handleOnClick}>
              Upload an Image
            </button>
          )
        }}
      </UploadWidget>

      {error && <p>{error}</p>}

      {url && (
        <div key={url._id} className='card' style={{ width: '18rem' }}
        >
          <img variant="top"  src={url} id="uploadedimage"  ></img>
          <p className="url">{url}</p>
        </div>
      )}


      {'New Blahg Name'}<input value={blahg.title} onChange={handleChange} name="title"></input><br />
      {'Author '}<input value={blahg.author} onChange={handleChange} name="author"></input><br />
      {'Text '}<input value={blahg.text} onChange={handleChange} name="text"></input><br />
      {'Category '}<select
        value={blahg.category}
        onChange={handleChange}
        name="category">
          <option value="Curiousities">Select One ...</option>
        <option value="Curiousities">Curiousities</option>
        <option value="Thoughts">Thoughts</option>
        <option value="ToDos">ToDos</option>
      </select><br />
      {'Image '}<input value={url} onChange={handleChange} name="url"></input><br />
      


      








      <button onClick={() => createNewBlahg()}>Create A New NewBlahg</button>
      {
        foundBlahg ? <div>
          <p>{foundBlahg.title}</p>
          <p>{foundBlahg.author}</p>
          <p>{foundBlahg.text}</p>
          <p>{foundBlahg.category}</p>
          <img variant="top"  src={foundBlahg.image} id="uploadedimage"  ></img>
         

        </div> : <>No New Accounts Found </>
      }

{
  <div>
                blahgs && blahgs.length ? (<ul>
                    {
                        blahgs.map((blahg) => {
                            return (
                                <li key={blahg._id}>
                                    {blahg.title} is {blahg.author} {blahg.category} {blahg.text}
                                    <br/><button onClick={() => deleteNewBlahg(blahg._id)}>X</button>
                                    <br/><button onClick={() => updateNewBlahg(blahg._id)}>Edit</button>
                                </li>
                            )
                        })
                    }
                </ul>): <>No Expenses Yet Add One Below</>
        </div>     }
           



    </>
  )
}

