import { useState, useEffect, useRef } from 'react'
import { Cloudinary } from "@cloudinary/url-gen";
import UploadWidget from './UploadWidget';
import Button from 'react-bootstrap/Button';
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


const updateNewBlahg = async (id, updatedData) => {
  try {
      const response = await fetch(`/api/blahgs/${id}`, {
          method: "PUT",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({...updatedData})
      })
      const data = await response.json()
      setFoundBlahg(data)
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
        <h1>CREATE A NEW BLOG</h1>
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
          <div key={url._id} className='card' style={{ width: '8rem' }}>
            <img variant="top" src={url} id="uploadedimage"></img>
            <p className="url">{url}</p>
          </div>
        )}

        {'New Blahg Name'}
        <input
          value={blahg.title}
          onChange={handleChange}
          onClick={(e) => {
            setShowInput(!showInput)
          }}
          
          name="title">
        </input>
        <br />
        {'Author '}
        <input
          value={blahg.author}
          onChange={handleChange}
          name="author">
        </input>
        <br />
        {'Text '}
        <input
          value={blahg.text}
          onChange={handleChange}
          name="text">
        </input>
        <br />
        {'Category '}
        <select
          value={blahg.category}
          onChange={handleChange}
          name="category">
          <option value="Curiousities">Select One ...</option>
          <option value="Curiousities">Curiousities</option>
          <option value="Thoughts">Thoughts</option>
          <option value="ToDos">ToDos</option>
        </select>
        <br />
        {'Image '}
        <input
          value={url}
          onChange={handleChange}
          name="url">
        </input>
        <br />

        <button onClick={() => createNewBlahg()}>READY TO SEE YOUR NewBlahg</button>
      </section>

      {

        blahgs && blahgs.length ? (
          <Container className='collumns'>
            <Row>
              <Col xs={16} md={6}>

                {
                  blahgs.map((blahg) => {
                    return (
                      <div className='collumn' key={blahg._id}>

                        <div className="head">
                          <span className="headline hl1">{blahg.title}</span>
                          <h4 onClick={() => setShowInput(!showInput)}>{blahg.text}</h4>
                          <span>{new Date(blahg.createdAt).toLocaleDateString()}</span>
                          <p>
                            <span className="headline hl2">by {blahg.author}</span>
                          </p>
                          <q>`{blahg.text.substr(0, 27)}...`</q>
                        </div>
                        <figure className="figure">
                          <img className="media" src={blahg.image} alt="" />
                          <figcaption className="figcaption">{blahg.category}</figcaption>
                        </figure>
                        <h4 onClick={() => setShowInput(!showInput)}>{blahg.title}</h4>
        <input
          ref={inputRef}
          style={{ display: showInput ? 'block' : 'none' }}
          type='text'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const title = inputRef.current.value
              updateNewBlahg(blahg._id, { title })
              setShowInput(false)
            }
          }}
          defaultValue={blahg.title}
        />
                        <ReadMore
                          text={blahg.text}
                         
                          deleteNewBlahg={deleteNewBlahg}
                          
                          numberOfLines={1}
                          lineHeight={1.2}
                          showLessButton={true}> 
                         
                        </ReadMore>
                        <br/><button onClick={() => deleteNewBlahg(blahg._id)}>X</button>
                        <br/><button onClick={() => updateNewBlahg(blahg._id)}>X</button>
                      </div>







                    )
                  })
                }
              </Col>
            </Row>
          </Container>) : <>No Expenses Yet Add One Below</>
      }




    </>
  )
}

