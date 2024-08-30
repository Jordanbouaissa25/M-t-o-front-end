import React, { useState, useEffect, ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { http } from "../../Infrastructure/Http/Axios.Instance";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);


async function connexion(username: string, password: string) {
  try {
    const response = await http.post("/login", { username, password });
    
    if (response.status === 200) {  // Utiliser un statut 200 pour succès
      console.log("Connexion réussie");
      const token = response.data.token;
      const _id = response.data._id;
      
      localStorage.setItem("token", token);
      localStorage.setItem("userId", _id);
      navigate("/search"); // Rediriger l'utilisateur après une connexion réussie
    } else {
    }
  } catch (error) {
    setError("Addresse mail ou mot de passe incorrecte")
    console.error("Erreur lors de la connexion:", error);
    // Afficher un message d'erreur à l'utilisateur si nécessaire
  }
}

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.currentTarget.value);
  };

  const handleRememberMeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRememberMe(event.currentTarget.checked);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#1c2448] text-white">
      <header className="w-full flex justify-between items-center bg-[#1c2448] px-5 py-2.5 h-12">
        <div className="relative">
          {/* Logo container */}
        </div>
        <div className="flex">
          <i className="search-icon text-xl ml-2.5"></i>
          <i className="menu-icon text-xl ml-2.5"></i>
        </div>
      </header>
      
      <div className="flex flex-col items-center justify-center w-full">
        <form onSubmit={(e)=>{e.preventDefault();connexion(email, password)}} className="bg-[#2d3658] p-5 rounded-lg shadow-md w-[300px] text-center">
          <h2 className="mb-5 text-2xl">Se connecter</h2>
          
          <p className="text-red-500 mb-4">{error}</p>

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

          <div className="flex justify-center items-center mb-10">
            <label className="text-sm">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={handleRememberMeChange} 
                className="mr-2"
              /> 
              Se souvenir de moi
            </label>
            <NavLink to="/reset" className="text-[#007bff] ml-4">Mot de passe oublié ?</NavLink>
          </div>

          <button type="submit" className="w-full p-2.5 bg-[#f8c700] rounded text-[#1c2448] text-lg mb-3 cursor-pointer">
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
