const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Document operations
  async uploadDocument(file: File): Promise<ApiResponse<{ id: string; filename: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.request('/documents/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async getDocuments(): Promise<ApiResponse<any[]>> {
    return this.request('/documents');
  }

  async deleteDocument(id: string): Promise<ApiResponse<void>> {
    return this.request(`/documents/${id}`, {
      method: 'DELETE',
    });
  }

  // Search operations
  async searchDocuments(query: string): Promise<ApiResponse<any[]>> {
    return this.request('/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  }

  async askQuestion(question: string): Promise<ApiResponse<{ answer: string; sources: any[] }>> {
    return this.request('/chat', {
      method: 'POST',
      body: JSON.stringify({ question }),
    });
  }

  // Analytics
  async getAnalytics(): Promise<ApiResponse<any>> {
    return this.request('/analytics');
  }

  // User management
  async getUsers(): Promise<ApiResponse<any[]>> {
    return this.request('/users');
  }
}

export const apiService = new ApiService();
export default apiService;