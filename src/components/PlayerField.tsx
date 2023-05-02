import { Character } from '@/pages';
import { Dispatch, SetStateAction, useState } from 'react';

interface PlayerFieldProps {
    onAdd: Dispatch<SetStateAction<Character[]>>
}

export const PlayerField = ({onAdd}: PlayerFieldProps) => {
  const [playerName, setPlayerName] = useState('');
  const [playerRace, setPlayerRace] = useState('');
  const [playerClass, setPlayerClass] = useState('');
    
  return (
    <div className='flex items-center gap-2 mb-4'>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="turn-count">
                  Player Name
        </label>
        <input value={playerName} onChange={e => setPlayerName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="turn-count" type="text" placeholder="Name..." />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="turn-count">
                  Player Race
        </label>
        <input value={playerRace} onChange={e => setPlayerRace(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="turn-count" type="text" placeholder="Race..." />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="turn-count">
                  Player Class
        </label>
        <input value={playerClass} onChange={e => setPlayerClass(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="turn-count" type="text" placeholder="Class..." />
      </div>
      <button onClick={() => onAdd(prev => [...prev, {name: playerName, race: playerClass, class: playerClass}])} className="bg-green-600 hover:bg-green-700 self-end text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add</button>
    </div>
  );
};