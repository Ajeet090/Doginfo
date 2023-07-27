import React from "react";
import{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {InlineReactionButtons} from 'sharethis-reactjs';
import {InlineShareButtons} from 'sharethis-reactjs';

function Home(){
    const[dogs, SetDogs] = useState([]);
    const [text, setText] = useState("")
    const [searched, setSearched] = useState(false)


useEffect( () => {
    const fetchDogData = async() =>{
       try {
        const res = await fetch('https://api.thedogapi.com/v1/breeds')
        const data = await res.json()
        SetDogs(data)
      
       } catch (error) {
        console.error(error)
       }
    }
    setSearched(false)
    fetchDogData()
},[])
const searchForDog = async () => {
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${text}`)
      const data = await res.json()
      SetDogs(data)
    
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    searchForDog()
    setSearched(true)
  }
  

    return(
<>
{!dogs ? (
    <h1 className="flex items-center justify-center text-center px-5 font-bold uppercase text-ellipsis-800">Loading...</h1>
) :(
    <>
    
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00cba9" fill-opacity="1" d="M0,224L20,234.7C40,245,80,267,120,277.3C160,288,200,288,240,272C280,256,320,224,360,186.7C400,149,440,107,480,122.7C520,139,560,213,600,229.3C640,245,680,203,720,165.3C760,128,800,96,840,74.7C880,53,920,43,960,74.7C1000,107,1040,181,1080,213.3C1120,245,1160,235,1200,224C1240,213,1280,203,1320,213.3C1360,224,1400,256,1420,272L1440,288L1440,0L1420,0C1400,0,1360,0,1320,0C1280,0,1240,0,1200,0C1160,0,1120,0,1080,0C1040,0,1000,0,960,0C920,0,880,0,840,0C800,0,760,0,720,0C680,0,640,0,600,0C560,0,520,0,480,0C440,0,400,0,360,0C320,0,280,0,240,0C200,0,160,0,120,0C80,0,40,0,20,0L0,0Z"></path></svg>
        <section className="p-8 max-w-6xl mx-auto">
        <div className="text-center">
        <h1 className="flex items-center justify-center text-center px-5 font-bold lg:text-5xl font-serif">
            The Dog Info App</h1>
            <form onSubmit={handleSubmit}  autoComplete="off">
               <input type="text" name="search" id="search" placeholder="Search for a Breed / Dog"
                className="py-2 px-4 my-10 rounded shadow-w-full bg-zinc-600 placeholder-white text-white w-4/5"
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
                </form> 
               
            </div> 
    
            <InlineShareButtons
          config={{
            alignment: 'center',  // alignment of buttons (left, center, right)
            color: 'social',      // set the color of buttons (social, white)
            enabled: true,        // show/hide buttons (true, false)
            font_size: 16,        // font size for the buttons
            labels: 'cta',        // button labels (cta, counts, null)
            language: 'en',       // which language to use (see LANGUAGES)
            networks: [           // which networks to include (see SHARING NETWORKS)
              'whatsapp',
              'linkedin',
              'messenger',
              'facebook',
              'twitter'
            ],
            padding: 12,          // padding within buttons (INTEGER)
            radius: 4,            // the corner radius on each button (INTEGER)
            show_total: true,
            size: 40,             // the size of each button (INTEGER)


            // OPTIONAL PARAMETERS

            min_count: 10,                    // (threshold for total share count to be displayed)
            url: 'https://www.sharethis.com', // (defaults to current url)
            image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
            description: 'custom text',       // (defaults to og:description or twitter:description)
            title: 'custom title',            // (defaults to og:title or twitter:title)
            message: 'custom email text',     // (only for email sharing)
            subject: 'custom email subject',  // (only for email sharing)
            username: 'custom twitter handle' // (only for twitter sharing)
          }}
        />
            <InlineReactionButtons
          config={{
            alignment: 'center',  // alignment of buttons (left, center, right)
            enabled: true,        // show/hide buttons (true, false)
            language: 'en',       // which language to use (see LANGUAGES)
            min_count: 0,         // hide react counts less than min_count (INTEGER)
            padding: 12,          // padding within buttons (INTEGER)
            reactions: [          // which reactions to include (see REACTIONS)
              'slight_smile',
              'heart_eyes',
              'laughing',
              'astonished',
              'sob',
              'rage'
            ],
            size: 48,             // the size of each button (INTEGER)
            spacing: 8,           // the spacing between buttons (INTEGER)


            // OPTIONAL PARAMETERS

            url: 'https://www.sharethis.com' // (defaults to current url)
          }}
        />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 my-5 lg:my-15">
                {!searched ? dogs.map ( (dog) => (
                    <Link key={dog.id}>
                    <article>
                        <img src={dog.image.url} alt={dog.name} loading="lazy" className="rounded md:h-72 w-full object-cover hover:opacity-50"/>
                        <h3 className=" text-blue-800 text-lg font-bold mt-2">{dog.name}</h3>
                        <p className=" text-ellipsis">Bred For : {dog.bred_for}</p>
                        <p className=" text-ellipsis">Breed Group : {dog.breed_group}</p>
                        <p className=" text-ellipsis">Life Span : {dog.life_span}</p>
                        <p className=" text-ellipsis">Height : {dog.height.metric}cm</p>
                    </article>
                </Link>
                )) : <>
                {dogs.map ( (dog) => (
                    <Link key={dog.id}>
                    <article>
                        <img src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} alt={dog.name} loading="lazy" className="rounded md:h-72 w-full object-cover hover:opacity-50"/>
                        <h3 className=" text-blue-800 text-lg font-bold mt-2">{dog.name}</h3>
                        <p className=" text-ellipsis">Bred For : {dog.bred_for}</p>
                        <p className=" text-ellipsis">Breed Group : {dog.breed_group}</p>
                        <p className=" text-ellipsis">Life Span : {dog.life_span}</p>
                        <p className=" text-ellipsis">Height : {dog.height.metric}cm</p>
                    </article>
                </Link>
                ))}
                </>}
               
                </div>   
            </section>
    </>
)}

</>

    )
}
export default Home;
