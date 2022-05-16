import { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';

function App() {
   const api = 'https://jsonplaceholder.typicode.com/todos';
   const [isLoading, setLoading] = useState(false);
   const [todos, setTodos] = useState([]);
   const [scroll, setScroll] = useState(false)
   const handleScroll = (e) => {
      let scrollValue = e.target.documentElement.scrollTop
      console.log(scrollValue);
      scrollValue > 20 ? setScroll(true) : setScroll(false)
      
   };
   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   });
   const handleOnclick = () => {
      setLoading(true);
      setTimeout(async () => {
         const res = await fetch(api);
         const data = await res.json();
         setTodos(data);
         setLoading(false);
      }, 3000);
   };
   console.log(todos);
   return (
      <>
         {todos && todos.map((todo) => <h1 key={todo.id}>{todo.title}</h1>)}
         {scroll ? <button style={{position:'fixed' ,top:'50%', right:'20px', padding:'20px'}}>Up</button> : null}
         <button onClick={handleOnclick}>
            {isLoading ? (
               <span>
                  {' '}
                  <RotatingLines width="30px" />{' '}
               </span>
            ) : (
               'Fetch Data'
            )}
         </button>
      </>
   );
}

export default App;
