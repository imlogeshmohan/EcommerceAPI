import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Subscribe() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const [errorMsg, setErrorMsg] = useState(null);
  const [ShowElement, setShowElement] = useState(null);

  const subscribe = async (e) => {
    setState('Loading');

    try {
      const response = await axios.post('/api/subscribe', { email });
      console.log(response.data.message);
      setState('SUCCESS');
      setEmail('');
    } catch (e) {
      if (e.response.data.error === 'Already Exist') {
        setErrorMsg(`${email} already exist try another email`);
      } else {
        setErrorMsg(e.response.data.error);
      }
      setState('ERROR');
    }
  };
  useEffect(() => {
    setShowElement(true);
    setTimeout(function () {
      setShowElement(false);
    }, 10000);
  }, [state]);
  return (
    <div className="text-gray-900 max-w-[420px] w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="border-2 rounded-full flex items-center justify-between"
      >
        <input
          className="focus:outline-none rounded-full bg-[#1e1e1e] sm:w-96 w-full text-white px-3 text-sm sm:text-lg"
          placeholder="Subcribe to get latest blog"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') subscribe();
          }}
        />
        <button
          className={`sm:py-5 px-4 py-2 sm:px-0  bg-white border-gray-900 rounded-full w-40 sm:w-52`}
          type="button"
          disabled={state === 'LOADING'}
          onClick={subscribe}
        >
          <p className="text-gray-800 text-sm sm:text-lg">Subscribe now</p>
        </button>
      </form>
      {state === 'ERROR' && ShowElement && (
        <p className="mt-2 w-full text-red-500 text-sm font-semibold text-center">
          {errorMsg}
        </p>
      )}
      {state === 'SUCCESS' && ShowElement && (
        <p className="w-full mt-2 text-green-600 text-2xl font-semibold text-center">
          Success!
        </p>
      )}
    </div>
  );
}

export default Subscribe;
