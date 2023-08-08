import { useState, useEffect } from 'react'
import { Cloudinary } from "@cloudinary/url-gen";
import UploadWidget from './UploadWidget';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { border } from '@cloudinary/url-gen/qualifiers/background';

// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// function BasicExample() {
//   return (
//     <Card style={{ width: '18rem' }}>
//       <Card.Img variant="top" src="holder.js/100px180" />
//       <Card.Body>
//         <Card.Title>Card Title</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Button variant="primary">Go somewhere</Button>
//       </Card.Body>
//     </Card>
//   );
// }

// export default BasicExample;

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
        <div key={url._id} className='card' style={{ width: '8rem' }}
        >
          <img variant="top" src={url} id="uploadedimage"  ></img>
          <p className="url">{url}</p>
        </div>
      )}

      {'New Blahg Name'}
      <input
        value={blahg.title}
        onChange={handleChange}
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












      <button onClick={() => createNewBlahg()}>Create A New NewBlahg</button>
      {
        foundBlahg ? <div>
          <p>{foundBlahg.title}</p>
          <p>{foundBlahg.author}</p>
          <p>{foundBlahg.text}</p>
          <p>{foundBlahg.category}</p>
          <Card.Img variant="top" src={foundBlahg.image} id="uploadedimage"  ></Card.Img>


        </div> : <>No New Blog Entries Found </>
      }

      {

        blahgs && blahgs.length ? (<ul>
          {
            blahgs.map((blahg) => {
              return (
               

                <Card key={blahg._id} style={{ 'width': '80%', 'padding': '5px', 'listStyle': 'none', 'borderStyle': 'dotted', 'textAlign': 'left', 'alignItems': 'flex-start' }}>
                  
                    
                    
                    <Card.Header>
                    <Card.Title style={{ 'justifyContent': 'left', 'alignItems': 'flex-start', 'fontSize': '22px' }}>{blahg.title}</Card.Title>
                    <Card.Img src={blahg.image} alt={blahg.category} style={{
                      'min-height': '120px',
                      'max-height': '120px', 'textAlign': 'justify'
                    }}></Card.Img>

                    <Card.Subtitle style={{ 'textAlign': 'left', 'fontSize': '20px' }}>by  {blahg.author}</Card.Subtitle>
                    </Card.Header>
                    
                    
                    <Card.Body>
                    <Card.Text style={{ 'justifyContent': 'left', 'fontSize': '16px' }}>{blahg.text}</Card.Text>



                    <br /><Button variant='primary' style={{ 'textAligh': 'right' }} onClick={() => deleteNewBlahg(blahg._id)}>X</Button>
                    <br /><Button onClick={() => updateNewBlahg(blahg._id)}>Edit</Button>
                  </Card.Body>
                </Card>
              )
            })
          }
        </ul>) : <>No Expenses Yet Add One Below</>
      }




    </>
  )
}

