import { ChatTextArea } from '@/components/ChatTextArea';
import { StoryOptionsForm } from '@/components/StoryOptionsForm';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [adventureStarted, setAdventureStarted] = useState(false);

  return (
    <main className="w-screen flex flex-col items-center mt-10">
      <h1 className='mx-auto text-6xl font-extrabold'>Choose Your Own Adventure</h1>
      <StoryOptionsForm prompt={prompt} setPrompt={setPrompt} adventureStarted={adventureStarted} />      
      <ChatTextArea prompt={prompt} setAdventureStarted={setAdventureStarted} adventureStarted={adventureStarted} setPrompt={setPrompt}/>
      <p className="text-center text-gray-500 text-xs">
    &copy;2023 Ranger Code - Colton Almaraz
      </p>
    </main>
  );
}