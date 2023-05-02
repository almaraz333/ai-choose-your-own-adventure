import { PlayerField } from '@/components/PlayerField';
import { MouseEvent, useEffect, useState } from 'react';

export interface Character {name: string, race: string, class: string}

let chatLog = '';

export default function Home() {
  const [chatResponse, setChatResponse] = useState('');
  const [playerCount, setPlayerCount] = useState('0');
  const [turnCount, setTurnCount] = useState('0');
  const [characters, setCharacters] = useState<Character[]>([] as Character[]);
  const [genre, setGenre] = useState('Fantasy');
  const [prompt, setPrompt] = useState('');
  const [adventureStarted, setAdventureStarted] = useState(false);

  const initialPrompt = 
  `I want you to create a text-based choose your own adventure story for ${playerCount} players with ${turnCount} steps (I have to make ${turnCount} decisions and after the last decision the story should conclude in a way that makes sense). 
  The story should include quirky challenges, amusing references, and surprise twists. 
  Do not explain the choice will lead to until the user makes a choice.
  The player characters are represented by the following array of JSON objects (including name, character race, and character class): 
  ${JSON.stringify(characters)}. 
  Each character is a human player helping make choices in real life with me.
  On each step you should pause and ask the users for a choice the will influence the direction of the story like a choose your own adventure book.
  The story takes place in a ${genre} setting and has a beginning, middle, and end. 
  All players are above 18 years old and understand the nature of the content, which includes adult humor and dark comedy. 
  Players should have opportunities to interact and collaborate with one another, as well as engage in friendly competition. 
  I will go through each step one by one, entering my choice and expecting the next part of the story to be generated accordingly. 
  Additionally, the story should include a point system or rewards to encourage player participation and create a more engaging party game experience. 
  Please describe the opening scene and first choice then wait for the user's choice.`;

  useEffect(() => {
    if(!adventureStarted) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt, adventureStarted]);

  console.log(chatLog);
    
  const fetchChat = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    chatLog = chatLog + JSON.stringify({role: 'assistant', prompt: chatResponse});

    setAdventureStarted(true);
    setChatResponse('');

    const res = await fetch('/api/chat', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({prompt: adventureStarted ? initialPrompt : `We have been having a conversation, and here is the context in the form of an array of objects: ${JSON.stringify(chatLog)}.
      Your responses do not need to match this format.
      In the chatLog, user messages have the role 'user', and your role is 'assistant'.
      Now, please continue the choose-your-own-adventure story based on the user's choice and present new choices for the players to make decisions in a list with numbers marking each choice: ${prompt}
      `})});

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = res.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder('utf-8');
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setChatResponse((prev) => prev + chunkValue);
    }

    chatLog = chatLog + JSON.stringify({role: 'user', prompt});
    setPrompt('');
  };

  return (
    <main className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-screen" onSubmit={fetchChat}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="player-count">
              Genre
          </label>
          <input value={genre} onChange={e => setGenre(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="player-count" type="text" placeholder="Genre..."/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="player-count">
              Number of Players
          </label>
          <input value={playerCount} onChange={e => setPlayerCount(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="player-count" type="number" placeholder="Number of players..."/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="turn-count">
              Number of Turns
          </label>
          <input value={turnCount} onChange={e => setTurnCount(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="turn-count" type="number" placeholder="Number of turns..." />
        </div>
        <div className="mb-6">
          {
            new Array(Number(playerCount)).fill(true).map(() => 
              <PlayerField onAdd={setCharacters} key={Math.floor(Math.random() * 10000)}/>
            )
          }
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prompt">
              Prompt
          </label>
          <input value={prompt} onChange={e => setPrompt(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="prompt" type="text" placeholder="Prompt" />
        </div>
        <button className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>Start Adventure</button>
        <textarea className='text-black w-full' rows={20} cols={20} value={chatResponse} readOnly/>
      </form>
      <p className="text-center text-gray-500 text-xs">
    &copy;2023 Ranger Code - Colton Almaraz
      </p>
    </main>
  );
}
