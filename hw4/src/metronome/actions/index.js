export const LOGIN = 'LOGIN';
export const login = (name) => (
  {
    type: LOGIN,
    name: name.name,
    loggedIn: true
  }
);
let gameId = 0;
export const ADD_GAME = 'ADD_GAME';
export const addGame = (frequency) =>(
    {
        type: ADD_GAME,
        payload: {
            id: gameId++,
            hits: [],
            open: 1,
            frequency: frequency.frequency,
            startMilliseconds: Date.now()
        }
    }
);

export const CLOSE_GAME = 'CLOSE_GAME';
export const closeGame = (id) =>(
    {
        type: CLOSE_GAME,
        payload: {
            gameId: id
        }
    }
);
export const RECORD_HIT = 'RECORD_HIT';
export const recordHit = (id) =>(
    {
        type: RECORD_HIT,
        payload: {
            gameId: id
        }
    }
);


