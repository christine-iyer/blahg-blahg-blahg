import { useState, useEffect } from 'react'
import { Cloudinary } from "@cloudinary/url-gen";
import UploadWidget from './UploadWidget';

export default function NewBlahg() {
  const [blahgs, setNewblahgs] = useState([])
  const [foundNewblahg, setFoundNewblahg] = useState(null)
  const [blahg, setNewblahg] = useState({
    title: '',
    author: '',
    category: '',
    text: '',
    image: ''
  })
  const handleChange = (evt) => {
    setNewblahg({ ...blahg, [evt.target.name]: evt.target.value })
  }

  // index
  const getNewPts = async () => {
    try {
      const response = await fetch('/api/blahgs')
      const data = await response.json()
      setNewblahgs(data)
    } catch (error) {
      console.error(error)
    }
  }
  // delete
  const deleteNewPt = async (id) => {
    try {
      const response = await fetch(`/api/blahgs/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setFoundNewblahg(data)
    } catch (error) {
      console.error(error)
    }
  }
  // update
  const updateNewPt = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/blahgs/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedData })
      })
      const data = await response.json()
      setFoundNewblahg(data)
    } catch (error) {
      console.error(error)
    }
  }
  // create
  const createNewPt = async () => {
    try {
      const response = await fetch(`/api/blahgs`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...blahg })
      })
      const data = await response.json()
      setFoundNewblahg(data)
      setNewblahg({
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
    getNewPts()
  }, [foundNewblahg])


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
    setNewblahg({
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
      {'Image '}<input src={blahg.image} onChange={handleChange} name="url"></input><br />
      


      








      <button onClick={() => createNewPt()}>Create A New NewPt</button>
      {
        foundNewblahg ? <div>
          <h2>{foundNewblahg.title}</h2>
          <h2>{foundNewblahg.author}</h2>
          <h2>{foundNewblahg.text}</h2>
          <h2>{foundNewblahg.category}</h2>
          <img variant="top"  src={foundNewblahg.image} id="uploadedimage"  ></img>
         

        </div> : <>No New Accounts Found </>
      }

{
                blahgs && blahgs.length ? (<ul>
                    {
                        blahgs.map((blahg) => {
                            return (
                                <li key={blahg._id}>
                                    {blahg.title} is {blahg.author} {blahg.category} {blahg.text}
                                    <br/><button onClick={() => deleteNewPt(blahg._id)}>X</button>
                                    <br/><button onClick={() => updateNewPt(blahg._id)}>Edit</button>
                                </li>
                            )
                        })
                    }
                </ul>): <>No Expenses Yet Add One Below</>
            }



    </>
  )
}

