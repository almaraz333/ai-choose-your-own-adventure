import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';

interface ChatTextAreaProps {
    adventureStarted: boolean;
    setAdventureStarted: Dispatch<SetStateAction<boolean>>;
    setPrompt: Dispatch<SetStateAction<string>>;
    prompt: string;
}

let chatLog = '';

export const ChatTextArea = ({adventureStarted, setAdventureStarted, setPrompt, prompt}: ChatTextAreaProps) => {
  const [chatResponse, setChatResponse] = useState('');

  const fetchChat = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAdventureStarted(true);
    chatLog = chatLog + JSON.stringify({role: 'assistant', prompt: chatResponse});

    setChatResponse('');


    const res = await fetch('/api/chat', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({prompt:
    `
    - We have been playing a game in the style of a choose your own adventure story. 
    - You are a brilliant story teller. You create narratives that are impeccable and contain vivid imagery and great detail.
    - There is an existing story in the following chat logs. Please refer to it for setting, characters, and previous choices made.
    - The previous chat logs are in JSON format: ${JSON.stringify(chatLog)}.
    - The directions are outlined in the chat log but to reiterate, You will continue with the next step of the choose your own adventure story and present the user with a choice that will impact the storyline
    - Your responses should be descriptive, at least 2 paragraphs long.
    - These choices will effect the rest of the story.
    - Please continue the choose your own adventure story. Here is the latest input: ${prompt}.
    - After your responses the user should be presented with one set of choices.
    - When you are done with your response make a new line below the choices, print "IMAGE_DESCRIPTION", create another new line and then describe the current scene.
    - Describe what the setting looks like, specifically the surrounding area and any buildings, plants, or objects
    - Also, describe each character's appearance, emotion, and facial expressions.
    - This description should be detailed but not too wordy. It should be ideal for an AI image generator input prompt.
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
    console.log(chatLog);
    setPrompt('');
  };

  return (
    <div className='w-11/12 mx-auto flex flex-col'>
      <button onClick={fetchChat} className="mt-5 self-start bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{adventureStarted ? 'Make Choice' : 'Start Adventure'}</button>
      <textarea className='text-black  my-10 border-gray-500 border-2 p-8' rows={15} cols={10} value={chatResponse} readOnly/>
    </div>
  );
};
