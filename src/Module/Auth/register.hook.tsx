import { useState } from 'react';
import { http } from '../../Infrastructure/Http/Axios.Instance';

type RegisterResponse = {
  success: boolean;
  message?: string;
};

const useRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const register = async (userData: {
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<RegisterResponse> => {
    if (!isValidForm(userData)) {
      setError('Veuillez remplir tous les champs correctement.');
      return { success: false, message: 'Validation error' };
    }

    setIsRegistering(true);
    setError(null);
    setSuccessMessage(null);

    try {
        console.log(userData)
      const response = await http.post('/register', {
            email: userData.email,
            password: userData.password,
      });

      if (response.data) {
        console.log(response.data)
        setSuccessMessage('Inscription réussie !');
        return { success: true };
      } else {
        const errorData = await response.data;
        setError(errorData.message || 'Erreur lors de l\'inscription.');
        return { success: false, message: errorData.message };
      }
    } catch (err) {
      console.error('Erreur lors de la soumission du formulaire:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
      return { success: false, message: 'Network error' };
    } finally {
      setIsRegistering(false);
    }
  };

  const isValidForm = (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    return (
      data.email.trim() !== '' &&
      data.password.trim() !== '' &&
      data.confirmPassword.trim() !== '' &&
      data.password === data.confirmPassword
    );
  };

  return { register, isRegistering, error, successMessage };
};

export default useRegister;