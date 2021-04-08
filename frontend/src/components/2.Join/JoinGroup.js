import {Link, Redirect} from 'react-router-dom';
import React, {useState, useEffect, useContext} from 'react';
import Help from '../Common/Help';
import UserInput from '../Common/UserInput';
import '../2.Join/JoinGroup.css';
import * as SocketEvents from './../../sockets';
import {SocketContext} from './../../sockets/SocketContext';
import '../Common/Help.css';

/**
 *
 * @return {*}
 */
function GroupCode() {
  const socketContext = useContext(SocketContext);
  const [name, setName] = useState('Alex');
  const [invalidCode, setInvalidCode] = useState(true);
  const [skip, setSkip] = useState(false);
  const [ButtonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    document.title = 'Enter group code';
    SocketEvents.skipToResults(socketContext.socket, setSkip);
    SocketEvents.invalidCode(socketContext.socket, setInvalidCode);
  }, []);

  // TODO needs to be used
  // just to 'use' the variable for now
  console.log(name);

  return (
    <>
      <h1 className='Title'>yumble</h1>
      <div className='MakeCentre'>
        <div className='GroupCode_Box'>
          <div className='AddMargin'>Enter group code</div>
          <div>
            <UserInput
              input
              type='text'
              inputType='joinGroup'
              placeholder=' P6aPE'
              fontSize={3}
              onChange={(e) => socketContext.setCode(e.target.value)}
            ></UserInput>
          </div>
          <div className='Username_Box'>
            <div className='AddMargin'>  Enter Name</div>
            <div>
              <UserInput
                input
                type='text'
                inputType='joinGroup' // what is inputType
                placeholder=' Alex'
                fontSize={3}
                // on change currently doesnt work
                onChange={(e) => setName(e.target.value)}
              ></UserInput>
            </div>
          </div>
          {!invalidCode && <Redirect to={`/Lobby/${socketContext.code}`} />}
          {skip && <Redirect to={'/Result'} />}
          <button
            onClick={() => SocketEvents.joinRoom(socketContext.socket,
                socketContext.code, name)}
            className='GoButton'>
                Go
          </button>
        </div>
      </div>
      <Link to='/'>
        <button className='SmallBtn' id='BackButton'>
          Back
        </button>
      </Link>
      <button
        onClick={() => setButtonPopup(true)}
        className='SmallBtn'
        id='HelpButton'>
        help?
      </button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p>
          Copy the group code from the person who created the lobby and paste it
          down here.
        </p>
      </Help>
    </>
  );
}

export default GroupCode;
