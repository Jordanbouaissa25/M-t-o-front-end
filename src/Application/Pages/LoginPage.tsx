import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
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
    <div className="login-container">
      <img
        src="../../public/logo.png"
        alt="Logo application météo"
        className="hidden lg:block"
      />
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Se connecter</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Adresse mail"
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Mot de passe"
            required
          />
        </div>
        <div className="input-group checkbox">
          <label>
            <input type="checkbox" /> Se souvenir de moi
          </label>
        </div>
        <button type="submit" className="login-button">
          Connectez-vous
        </button>
        <div className="links">
          <a href="#">Mot de passe oublié?</a>
          <a href="#">S'INSCRIRE</a>
          <a href="#"> Inscription gratuite</a>
          <button type="submit" className="register-button">
            Créer mon compte
          </button>
        </div>
      </form>
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

