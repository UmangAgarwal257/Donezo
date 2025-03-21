import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Recipient {
  _id: string;
  email: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmailLog {
  _id: string;
  recipient: Recipient;
  status: 'sent' | 'failed';
  error?: string;
  sentAt: string;
  template: {
    style: 'elonMusk' | 'steveJobs';
    type: 'weeklyCheck' | 'reminder';
  };
}

export interface EmailResult {
  recipient: string;
  status: 'success' | 'failed';
  emailId?: string;
  error?: string;
}

export interface TestEmailResponse {
  message: string;
  nextEmailDate: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  nextEmailDate: string;
  style: 'elonMusk' | 'steveJobs';
  recipient: Recipient;
}

export interface RegisterRequest {
  style: 'elonMusk' | 'steveJobs';
  recipient: {
    email: string;
    name: string;
    timezone: string;
  };
}

export interface SendEmailOptions {
  style?: 'elonMusk' | 'steveJobs';
  type?: 'weeklyCheck' | 'reminder';
  recipient?: {
    email: string;
    name: string;
  };
}

export const recipientApi = {
  getAll: () => api.get<Recipient[]>('/recipients'),
  create: (data: { email: string; name: string }) => api.post<Recipient>('/recipients', data),
  update: (id: string, data: Partial<Recipient>) => api.patch<Recipient>(`/recipients/${id}`, data),
  delete: (id: string) => api.delete(`/recipients/${id}`),
};

export const emailLogApi = {
  getAll: () => api.get<EmailLog[]>('/logs'),
  getByRecipient: (recipientId: string) => api.get<EmailLog[]>(`/logs/recipient/${recipientId}`),
  sendTestEmail: async (options: SendEmailOptions) => {
    const response = await axios.post<TestEmailResponse>('/api/test/send-email', options);
    return response.data;
  },
  register: async (data: RegisterRequest) => {
    const response = await api.post<RegistrationResponse>('/register', data);
    return response.data;
  }
};

export default api;