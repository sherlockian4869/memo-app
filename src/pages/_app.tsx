//App.tsx
import React from 'react';
import { RecoilRoot } from 'recoil';
import { TodoContainer } from './todo/todoContainer';

function App() {
  return (
    <div className='App'>
      <RecoilRoot>
        <TodoContainer />
      </RecoilRoot>
    </div>
  );
}

export default App;
