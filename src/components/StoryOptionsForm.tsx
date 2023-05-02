import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PlayerField } from './PlayerField';
import { characterState } from '@/atoms';
import { useRecoilValue } from 'recoil';

interface StoryOptionsFormProps {
    prompt: string;
    setPrompt: Dispatch<SetStateAction<string>>;
    adventureStarted: boolean;
}

export const StoryOptionsForm = ({setPrompt, prompt, adventureStarted}: StoryOptionsFormProps) => {
  const [playerCount, setPlayerCount] = useState('0');
  const [turnCount, setTurnCount] = useState('0');
  const [genre, setGenre] = useState('Fantasy');

  const [initialPrompt, setInitialPrompt] = useState('');

  const characters = useRecoilValue(characterState);

  console.log(characters,genre);

  useEffect(() => {
    setInitialPrompt(
      `
        I want you to create a text based choose your own adventure game based on the following criteria:
        - ${playerCount} number of players. This is how many real life people are playing. There will be a character for each defined in the next step
        - These are the characters in the format of JSON. Each character has a name, fictional race, and class: ${JSON.stringify(characters)}
        - This choose your own adventure story should be in the style/genre of ${genre}
        - This choose your own adventure story should refer to the players by their characters and incorporate the characters fictional race and class.
        - This choose your own adventure story will be generated step by step
        - The first step is the opening scene. Describe the situation, environment, and characters in great detail.
        - The characters will be mentioned by name and a short back story will be written about them.
        - After each step you will wait and present choices to the user in the style of a choose your own adventure story. 
        - Once the user makes a choice the next step of the story is generated with another choice 
        `
    );
  }, [playerCount, turnCount, characters, genre]);

  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt, setPrompt]);

  return (
    <form className="mx-auto shadow-md rounded px-8 pt-6 pb-8 w-11/12">
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
        {
          new Array(Number(playerCount)).fill(true).map(() => 
            <PlayerField key={Math.floor(Math.random() * 10000)}/>
          )
        }
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="turn-count">
          Number of Turns
        </label>
        <input value={turnCount} onChange={e => setTurnCount(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="turn-count" type="number" placeholder="Number of turns..." />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prompt">
          Prompt
        </label>
        <input value={adventureStarted ? prompt : ''} onChange={e => setPrompt(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="prompt" type="text" placeholder="Prompt" />
      </div>
    </form>
  );
};
