import {Loader} from '@googlemaps/js-api-loader';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import getAPIKey from '../Common/getAPIKey';
import Help from '../Common/Help';

import '../Common/Help.css';

/**
 *
 * @return {*}
 */
function StartPage() {
  useEffect(() => {
    document.title = 'Yumble: Find places to eat, fast';
  }, []);
  let apiKey;
  // Get API key from API instead of writing here for security reasons.
  getAPIKey(0).then((value) => {
    apiKey = value;
    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['places'],
    });
    loader.load().then(() => {
    });
  });
  const [ButtonPopup, setButtonPopup] = useState(false);

  return (
    <>
      <div className='MakeCentre'>
        <h1 className='StartTitle'>yumble</h1>
        <Link to='/Preferences'>
          <button className='BigBtn' id='CreateGroup_btn'>
            Create group
          </button>
        </Link>
        <Link to='/JoinGroup'>
          <button className='BigBtn' id='JoinGroup_btn'>
            Join group
          </button>
        </Link>
      </div>

      <button
        onClick={() => setButtonPopup(true)}
        className='SmallBtn'
        id='HelpButton'
      >
        help?
      </button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p>
          Press the [create group] to create a lobby. To join a group, press the
          [join group] to join a group
        </p>
      </Help>
    </>
  );
}

export default StartPage;
