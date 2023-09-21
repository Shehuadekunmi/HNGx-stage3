import { Images} from '../components/Images'
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Header from '../components/Header';
import SearchBar from '../components/Searchbar';
import Loading from '../components/Loading'
import Footer from '../components/Footer';

function App() {
  const [images, setImages] = useState(Images)
  const [loading, setLoading] = useState(true)

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);
  }

  useEffect(() => {
    setTimeout(() => {
      const data = Images;
      setImages(data);
      setLoading(false);
    }, 2000)
  }, [])

  return (
    <div className="my-5">
      <Header />
      {
        loading ? (<Loading />) : (
          <div>        <h1 className='text-center py-5'>Drag and Drop Image Gallery</h1>

            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="characters">
                {(provided) => (
                  <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                    {images.map((image, index) => {
                      const { id, thumb, tag } = image
                      return (
                        <Draggable key={id} draggableId={id} index={index}  >
                          {(provided) => (
                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <div className="thumb">
                                <img src={thumb} alt={`${tag} `} />
                              </div>
                              <p>
                                {tag}
                              </p>

                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
            </div>
            )
          
     }

<Footer/>

    </div>
  );
}

export default App;