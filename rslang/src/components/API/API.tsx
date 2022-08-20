import { IEmailPassword, IPropertyWord, ISettings, IStatistic, IUser, IWords } from "../../types/types";

const urlBase = 'https://rs-rslang.herokuapp.com';
const urlWords = `${urlBase}/words`;
const urlUsers = `${urlBase}/users`;
const urlSignin = `${urlBase}/signin`;

export const getWords = async (page = 0, group = 0) => {
  const response = await fetch(`${urlWords}?page=${page}&group=${group}`);
  const data: IWords = await response.json();

  return data;
}

export const getWord = async (id: string) => {
  const response = await fetch(`${urlWords}/${id}`);
  const data: IWords = await response.json();

  return data;
}

export const createUser = async (user: IUser) => {
  const response = await fetch(urlUsers, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};

export const getUser = async (id: string, token: string) => {
  const response = await fetch(`${urlUsers}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const updateUser = async (id: string, token: string, user: IEmailPassword) => {
  const response = await fetch(`${urlUsers}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }
  );

  return await response.json();
}

export const deleteUser = async (id: string, token: string) => {
  const response = await fetch(`${urlUsers}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const getNewUserTokens = async (id: string, token: string) => {
  const response = await fetch(`${urlUsers}/${id}/tokens`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const getAllUserWords = async (id: string, token: string) => {
  const response = await fetch(`${urlUsers}/${id}/words`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const createUserWord = async (id: string, wordId: string, property: IPropertyWord, token: string) => {
  const response = await fetch(`${urlUsers}/${id}/words/${wordId}`, {
    method: 'POST',
    body: JSON.stringify(property),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }
  );

  return await response.json();
}

export const getUserWord = async (id: string, wordId: string, token: string) => {
  const response = await fetch(`${urlUsers}/${id}/words/${wordId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const updateUserWord = async (id: string, wordId: string, property: IPropertyWord, token: string) => {
  const response = await fetch(`${urlUsers}/${id}/words/${wordId}`, {
    method: 'PUT',
    body: JSON.stringify(property),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }
  );

  return await response.json();
}

export const deleteUserWord = async (id: string, wordId: string, token: string) => {
  fetch(`${urlUsers}/${id}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );
}

export const getAllUserAggregatedWords = async (id: string, perPage: number, filter: object, token: string) => {
  const filterToString = JSON.stringify(filter)
  const response = await fetch(`${urlUsers}/${id}/aggregatedWords?wordsPerPage=${perPage}&filter=${filterToString}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const getUserAggregatedWord = async (id: string, wordId: string, token: string) => {
  const response = await fetch(`${urlUsers}/${id}/aggregatedWords/${wordId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const getUserStatistics = async (id: string, token: string) => {
  const response = await fetch(`${urlUsers}/${id}/statistics`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const updateUserStatistics = async (id: string, statistics: IStatistic, token: string) => {
  const response = await fetch(`${urlUsers}/${id}/statistics`, {
    method: 'PUT',
    body: JSON.stringify(statistics),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }
  );

  return await response.json();
}

export const getUserSettings = async (id: string, token: string) => {
  const response = await fetch(`${urlUsers}/${id}/settings`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const updateUserSettings = async (id: string, statistics: ISettings, token: string) => {
  const response = await fetch(`${urlUsers}/${id}/settings`, {
    method: 'PUT',
    body: JSON.stringify(statistics),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }
  );

  return await response.json();
}

export const loginUser = async (user: IEmailPassword) => {
  const response = await fetch(urlSignin, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}