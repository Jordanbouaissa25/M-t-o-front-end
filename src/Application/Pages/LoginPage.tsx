import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Charger les valeurs stockées dans localStorage lors du montage du composant
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const response = await fakeHttpPost("/", { email, password });
      const { token, _id } = response.data;
      if (token && _id) {
        login(token, _id);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", _id);

        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }

        console.log("Connexion réussie");
        console.log("token", token);
        console.log("UserId", _id);

        navigate("/"); // Rediriger l'utilisateur après une connexion réussie
      }
    } catch (error: unknown) {
      console.error("Erreur de connexion:", error);
      setError("Identifiant ou mot de passe incorrect. Veuillez réessayer.");
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRememberMe(event.target.checked);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#1c2448] text-white">
      <header className="w-full flex justify-between items-center bg-[#1c2448] px-5 py-2.5 h-12">
        <div className="relative">
          {/* Logo container */}
        </div>
        <div className="flex">
          <i className="search-icon text-xl ml-2.5"></i> {/* Remplacez avec une implémentation d'icône */}
          <i className="menu-icon text-xl ml-2.5"></i> {/* Remplacez avec une implémentation d'icône */}
        </div>
      </header>
      
      <div className="flex flex-col items-center justify-center w-full">
        <form onSubmit={handleSubmit} className="bg-[#2d3658] p-5 rounded-lg shadow-md w-[300px] text-center">
          <h2 className="mb-5 text-2xl">Se connecter</h2>
          <div className="relative right-20">
            <label htmlFor="mail" className="mb-2 text-md">Adresse mail</label>
          </div>
          <div className="mb-5">
            <input 
              type="email" 
              value={email} 
              onChange={handleEmailChange} 
              placeholder="Adresse mail" 
              className="w-full p-2.5 rounded border border-gray-300 text-black bg-white"
              required 
            />
          </div>
          <div className="relative right-20">
            <label htmlFor="password">Mot de passe</label>
          </div>
          <div className="mb-5">
            <input 
              type="password" 
              value={password} 
              onChange={handlePasswordChange} 
              placeholder="Mot de passe" 
              className="w-full p-2.5 rounded border border-gray-300 text-black bg-white"
              required 
            />
          </div>

          <div className="flex justify-center items-center mb-5">
            <label className="text-sm">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={handleRememberMeChange} 
                className="mr-2"
              /> 
              Se souvenir de moi
            </label>
            <NavLink to="/reset" className="text-[#FFFFFF] ml-4">Mot de passe oublié ?</NavLink>
          </div>

          <button onClick={() => navigate("/weather")} type="submit" className="w-full p-2.5 bg-[#f8c700] rounded text-[#1c2448] text-lg mb-3 cursor-pointer">
            Connectez-vous
          </button>

          <div className="relative w-full h-1 bg-[#007bff] mb-6">
            <div className="absolute left-0 h-1 bg-[#f8c700]" style={{ width: '50%' }}></div>
          </div>
          
          <div className="flex justify-between mb-3 text-sm">
            <button onClick={() => navigate("/register")} className="w-full p-2.5 bg-[#007bff] mt-0 rounded text-[#000000] text-lg cursor-pointer">
              Créer mon compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Fonction factice pour simuler une requête HTTP
async function fakeHttpPost(url: string, data: any) {
  return new Promise<{ data: { token: string; _id: string } }>((resolve) =>
    setTimeout(() => resolve({ data: { token: "fakeToken", _id: "fakeId" } }), 1000)
  );
}

// Fonction factice de connexion
function login(token: string, userId: string) {
  console.log("User logged in with token:", token, "and ID:", userId);
}
