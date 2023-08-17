import { useState, useEffect } from 'react'


export default function BlahgsPage (props){
    const [blahgs, setBlahgs] = useState([])
    const [foundBlahg, setFoundBlahg] = useState(null)
    const [newBlahg, setNewBlahg] = useState({
     title: '',
     author: '',
     category: '',
     text: '',
     image: ''
    })
    // index
    const getBlahgs = async () => {
        try {
            const response = await fetch('/api/blahgs')
            const data = await response.json()
            setBlahgs(data)
        } catch (error) {
            console.error(error)
        }
    }
    // delete
    const deleteBlahg = async (id) => {
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
    const updateBlahg = async (id, updatedText) => {
        try {
            const response = await fetch(`/api/blahgs/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...updatedText, text: updatedText})
            })
            const data = await response.json()
            setFoundBlahg(data)
        } catch (error) {
            console.error(error)
        }
    }
    // create
        const createBlahg = async () => {
            try {
                const response = await fetch(`/api/blahgs`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...newBlahg})
                })
                const data = await response.json()
                setFoundBlahg(data)
                setNewBlahg({
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

    const handleChange = (evt) => {
        setNewBlahg({...newBlahg, [evt.target.name]: evt.target.value})
    }

    useEffect(()=> {
        getBlahgs()
    }, [foundBlahg])

    return (
        <>
            {
                blahgs && blahgs.length ? (<ul>
                    {
                        blahgs.map((blahg) => {
                            return (
                                <li key={blahg._id}>
                                    {blahg.title} is {blahg.category} {blahg.text}
                                    <br/><button onClick={() => deleteBlahg(blahg._id)}>Delete This Blahg</button>
                                    <br/><button onClick={() => updateBlahg(setFoundBlahg(true))}>Edit This Blahg</button>
                                </li>
                            )
                        })
                    }
                </ul>): <h1>No Blahgs Yet Add One Below</h1>
            }
            {'Name '}<input value={newBlahg.title} onChange={handleChange} name="title"></input><br/>
            {'Color '}<input value={newBlahg.category} onChange={handleChange} name="category"></input><br/>
            {'Ready To Eat '}<input  value={newBlahg.text} onChange={(evt) => setNewBlahg({...newBlahg })}></input><br/>
            <button onClick={() => createBlahg() }>Create A New Blahg</button>
            {
                foundBlahg? <div>
                    <h1>{foundBlahg.title}</h1>
                    <h2>{foundBlahg.author}</h2>
                    <h3>{foundBlahg.text}</h3>
                </div>: <>No Blahg in Found Blahg State</>
            }

        </>
    )
}