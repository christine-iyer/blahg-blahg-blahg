import { useState, useEffect, useRef } from 'react'
import { Cloudinary } from "@cloudinary/url-gen";
import UploadWidget from './UploadWidget';
import { Container, Row, Col } from 'react-bootstrap';
import { border } from '@cloudinary/url-gen/qualifiers/background';
import ReadMore from './ReadMore';
import '../../App.css';

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
  const [showInput, setShowInput] = useState(false)
  const [showReadMoreButton, setShowReadMoreButton] = useState(false)
  const ref = useRef(null)
  const inputRef = useRef(null)
  const handleChange = (evt) => {
    setBlahg({ ...blahg, [evt.target.name]: evt.target.value })
  }
  const getNewBlahgs = async () => {
    try {
      const response = await fetch('/api/blahgs')
      const data = await response.json()
      setBlahgs(data)
    } catch (error) {
      console.error(error)
    }
  }
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
//   const updateNewBlahg = async (id, updatedData) => {
//     try {
//       const response = await fetch(`/api/blahgs/${id}`, {
//         method: "PUT",
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ updatedData })
//       })
// const data = await response.json()
//       const blahgsCopy = [...blahgs]
//       const index = blahgsCopy.findIndex(blahg => id === blahg._id)
//       blahgsCopy[index] = { ...blahgsCopy[index], ...updatedData}
//       setFoundBlahg(blahgsCopy)
//     } catch (error) {
//       console.error(error)
//     }
//   }
  const createNewBlahg = async () => {
    try {
      const response = await fetch('/api/blahgs', {
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
        createdDate: '',
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
      <section>
        <h1>Post Shamelessly</h1>
        <div>
<span>
          <UploadWidget onUpload={handleOnUpload}>
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                open();
              }
              return (
                <button className = "button" onClick={handleOnClick}>
                  🤍
                </button>
              )
            }}
          </UploadWidget>
          {error && <p>{error}</p>}
{url && (
            <div key={url._id} className='card' style={{ width: '8rem' }}>
              <img variant="top" src={url} alt='uploaded image' id="uploadedimage" style={{'width': 90, "borderRadius": "5%"}}></img>
              <p className="url">{url}</p>
            </div>
          )}
          </span>
          <br></br>
          <br></br>
         <input
          type='text'
          // defaultValue={blahg.title}
            value={blahg.title}
            onChange={handleChange}
            name="title"
            placeholder='Bottom Line'
            onClick={(e) => {
              setShowInput(!showInput)
            }}
          >
          </input>
          <br />
         <input
            value={blahg.author}
            onChange={handleChange}
            name="author"
            placeholder='Author'>
          </input>
          <br />
          <input
            value={blahg.text}
            onChange={handleChange}
            name="text"
            rows={2}
            placeholder='Details'>
          </input>
          <br />
          <select
            value={blahg.category}
            onChange={handleChange}
            name="category">
            <option value="Curiousities">Select 🤍</option>
            <option value="💛 Thank Me ⬅️, Franky">💛 Thank Me ⬅️, Franky</option>
            <option value="🧡 Janky Franky">🧡 Janky Franky</option>
            <option value="💚 Frankly Franky">💚 Frankly Franky</option>
            <option value="💙 Cranky Franky">💙 Cranky Franky</option>
            <option value="💜 Swanky Franky">💜 Swanky Franky</option>
            <option value="❤️ Franky Panky">❤️ Franky Panky</option>
          </select>
          <br />
<br />
          <button onClick={() => createNewBlahg()}>Your NewBlahg</button>
        </div>
      </section>
<hr></hr>
      {blahgs && blahgs.length ? (
        <Container className='collumns'>
          <Row>
            <Col xs={16} md={6}>
              {blahgs.map((blahg) => {
                return (
                  <div className='collumn' key={blahg._id}>
                    <div className="head">

                      <span><h2 >{blahg.title},  </h2>created by {blahg.author}, on {new Date(blahg.createdAt).toLocaleDateString()}</span>
{/* <p>
                        <span className="headline hl2">Created by {blahg.author}, on {new Date(blahg.createdAt).toLocaleDateString()}</span>
                      </p> */}
                      <br></br>

                      <q>`{blahg.text.substr(0, 27)}...`</q>
</div>
<div className="frame">
                    <figure className="figure">

                      <img className="media" src={blahg.image} alt="" />

<figcaption className="figcaption">{blahg.category}</figcaption>

<ReadMore className="readMore"
                      text={blahg.text}
                      deleteNewBlahg={deleteNewBlahg}
                      numberOfLines={1}
                      lineHeight={1.2}
                      showLessButton={true}>
                    </ReadMore>
                    </figure>
                    <br /><button onClick={() => deleteNewBlahg(blahg._id)}>X</button>
                  </div>
                  </div>

                ) 

              })
              }
            </Col>
          </Row>
        </Container>) : <>No Entries yet! Yet Add One Below</>
      }
    </>
  )
}
