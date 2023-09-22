import React, { useEffect, useState } from 'react'
import { Images } from '../components/Images'
import { closestCenter, DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensors, useSensor } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Loading from '../components/Loading';
import '../styles/drop.css'
import Header from '../components/Header';
import Footer from '../components/Footer';

const SortableUser = ({ user }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: user.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div>

      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="charact "
      >
        <div className="thu"> <img src={user.thumb} alt="" /> </div>
        <p> {user.tag}</p>
      </div>
    </div>
  );
}



const Drop = () => {

  const [users, setUsers] = useState(Images);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true)
  const addUser = () => {
    newUser = {
      id: Date.now().toString(),
      name: inputValue,
    };
    setInputValue("");
    setUsers((users) => [...users, newUser]);
  };


  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setUsers((users) => {
      const oldIndex = users.findIndex((user) => user.id === active.id);
      const newIndex = users.findIndex((user) => user.id === over.id);
      return arrayMove(users, oldIndex, newIndex);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5}}),
    useSensor (TouchSensor,  { activationConstraint: { delay: 50, tolerance: 10},}),
    useSensor (KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates})
  )

  return (
    <div className="my-5">
      <Header/>
 <h1 className='text-center py-5'>Drag and Drop Image Gallery</h1>
    {
      loading ? (<Loading/>) : (
        <div className="grid-container">
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd} sensors={sensors}>
          <SortableContext items={users} m>
            {users.map((user, index) => (
              <SortableUser key={user.id} user={user} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      )
    }

    <Footer/>

     
    </div>
  )
}

export default Drop