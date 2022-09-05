import { URL_SINGIN, URL_USERS, URL_WORDS } from "../../constants/constants";
import { IEmailPassword, IPropertyWord, ISettings, IStatistic, IUser, IWords } from "../../types/types";

export const getWords = async (group = 0, page = 0) => {
  const response = await fetch(`${URL_WORDS}?group=${group}&page=${page}`);
  const data: IWords[] = await response.json();

  return data;
}

export const getWord = async (id: string) => {
  const response = await fetch(`${URL_WORDS}/${id}`);
  const data: IWords = await response.json();

  return data;
}

export const createUser = async (user: IUser) => {
  const response = await fetch(URL_USERS, {
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
  const response = await fetch(`${URL_USERS}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const updateUser = async (id: string, token: string, user: IEmailPassword) => {
  const response = await fetch(`${URL_USERS}/${id}`, {
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
  const response = await fetch(`${URL_USERS}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const getNewUserTokens = async (id: string, token: string) => {
  const response = await fetch(`${URL_USERS}/${id}/tokens`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const getAllUserWords = async (id: string, token: string) => {
  const response = await fetch(`${URL_USERS}/${id}/words`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const createUserWord = async (id: string, wordId: string, property: IPropertyWord, token: string) => {
  const response = await fetch(`${URL_USERS}/${id}/words/${wordId}`, {
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
  try {
    const response = await fetch(`${URL_USERS}/${id}/words/${wordId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    );

    if (response.status === 404) {
      throw new Error('Нет такого пользователя');
    } else {
      return await response.json();
    }

  } catch (e: unknown) {
    if (typeof e === "string") {
      console.log(e);
    }

    throw e;
  }

}

export const updateUserWord = async (id: string, wordId: string, property: IPropertyWord, token: string) => {
  const response = await fetch(`${URL_USERS}/${id}/words/${wordId}`, {
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
  fetch(`${URL_USERS}/${id}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );
}

export const getAllUserAggregatedWords = async (id: string, perPage: number, filter: object, token: string) => {
  const filterToString = JSON.stringify(filter)
  const response = await fetch(`${URL_USERS}/${id}/aggregatedWords?wordsPerPage=${perPage}&filter=${filterToString}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const getUserAggregatedWord = async (id: string, wordId: string, token: string) => {
  const response = await fetch(`${URL_USERS}/${id}/aggregatedWords/${wordId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const getUserStatistics = async (id: string, token: string) => {
  const response = await fetch(`${URL_USERS}/${id}/statistics`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const updateUserStatistics = async (id: string, statistics: IStatistic, token: string) => {
  const response = await fetch(`${URL_USERS}/${id}/statistics`, {
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
  const response = await fetch(`${URL_USERS}/${id}/settings`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  );

  return await response.json();
}

export const updateUserSettings = async (id: string, statistics: ISettings, token: string) => {
  const response = await fetch(`${URL_USERS}/${id}/settings`, {
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
  try {
    const response = await fetch(URL_SINGIN, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 404) {
      throw new Error('Неверный логин или пароль');
    } else {
      return await response.json();
    }

  } catch (e: unknown) {
    if (typeof e === "string") {
      console.log(e);
    }

    throw e;
  }
}