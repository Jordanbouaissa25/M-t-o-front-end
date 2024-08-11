import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// import "./index.css"; // Assurez-vous d'importer votre fichier CSS ici

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      // Remplacez `http.post` par votre méthode de requête HTTP
      const response = await fakeHttpPost("/login", { email, password });
      const { token, _id } = response.data;
      if (token && _id) {
        // Remplacez `login` par votre logique de connexion
        login(token, _id);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", _id);

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

  
    return (
        <div className="login-page">
            <header className="header">
            <div className="logo-container">
            </div>
                <div className="header-icons">
                    <i className="search-icon"></i> {/* Replace with actual icon implementation */}
                    <i className="menu-icon"></i> {/* Replace with actual icon implementation */}
                </div>
            </header>
            <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2 className="form-title">Se connecter</h2>

                    <div className="input-group">
                        <input 
                            type="email" 
                            value={email} 
                            onChange={handleEmailChange} 
                            placeholder="Adresse mail" 
                            className="input-field"
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <input 
                            type="password" 
                            value={password} 
                            onChange={handlePasswordChange} 
                            placeholder="Mot de passe" 
                            className="input-field"
                            required 
                        />
                    </div>

                    <div className="input-group checkbox-group">
                        <label>
                            <input type="checkbox" /> Se souvenir de moi
                        </label>
                    </div>

                    <button type="submit" className="login-button">Connectez-vous</button>
                    
                    <div className="additional-links">
                        <a href="#" className="forgot-password">Mot de passe oublié ?</a>
                        <a href="#" className="sign-up-link">S'INSCRIRE</a>
                    </div>
                    
                    <button className="create-account-button">Créer mon compte</button>
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

