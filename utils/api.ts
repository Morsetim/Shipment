import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Alert } from 'react-native';


interface LoginCredentials {
    email: string;
    password: string;
  }

  export interface AWB {
    name: string;
    // Add other fields as per your API response
  }
  
  export interface APIResponse {
    message: AWB[];
  }

const API_URL = 'https://shippex-demo.bc.brandimic.com/api/method/frappe.client.get_list';

export const loginApi = async (data: any) => {
    try {
        const response = await axios.post('https://shippex-demo.bc.brandimic.com/api/method/login', data);
        return response.data;

    } catch(e: any) {
      Alert.alert('Login Failed Please check your login credentails');
    }
};
export const getAllShipments = async () => {
    const response = await axios.post<APIResponse>(API_URL, {
        doctype: "AWB",
        fields: ["*"]
      });
      return response.data;
};

export const useAWBs = (): UseQueryResult<APIResponse, Error> => {
    return useQuery({
      queryKey: ['awbs'],
      queryFn: getAllShipments
    });
  };