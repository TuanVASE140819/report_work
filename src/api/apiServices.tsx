
import axios from 'axios';
export const api = axios.create({
  baseURL: 'https://report-work.onrender.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

//   trả token về cho server

api.interceptors.request.use((config : any) => {
  const token = localStorage.getItem('token');
    if (token) {
        config.header.Authorization = `Bearer ${token}`
  }
  return config;
});
// https://report-work.onrender.com/login
export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/login', {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getUser = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const reportInput = async (
  idUser: string,
  msnv: string,
  name: string,
  date: string,
  today: string,
  tomorrow: string
): Promise<any> => {
  try {
    const response = await api.post('/report/create', {
      idUser,
      msnv,
      name,
      date,
      today,
      tomorrow,
    });
    
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else {
      return { error: 'An unknown error occurred' };
    }
  }
};

export const create = async (username: string,name: string, role: string, password: string) => {
  try {
    const response = await api.post('/user/create', {
      username,
      name,
      role,
      password,
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};