// RegisterPage.tsx
import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Récupérer la liste des utilisateurs stockés
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Vérifier si l'utilisateur existe déjà
    if (users.some((user: any) => user.email === email)) {
      setError("Cet email est déjà utilisé.");
      return;
    }

    // Ajouter le nouvel utilisateur à la liste
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Simuler une inscription réussie
    const response = await fakeHttpPost("/register", { email, password });
    const { token, _id } = response.data;

    // Simuler la connexion après inscription
    login(token, _id);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", _id);

    navigate("/"); // Rediriger l'utilisateur après une inscription réussie
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#1c2448] text-white p-4">
      <form onSubmit={handleSubmit} className="bg-[#2d3658] p-6 rounded-lg shadow-md w-[300px] text-center">
        <h2 className="mb-6 text-2xl font-semibold">S'inscrire</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="ex. toto.dupond@gmail.com"
            className="w-full p-2.5 rounded border border-gray-300 text-black bg-white"
            required 
          />
        </div>
        <div className="mb-4">
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Mot de passe" 
            className="w-full p-2.5 rounded border border-gray-300 text-black bg-white"
            required 
          />
        </div>
        <div className="mb-4">
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirmation mot de passe" 
            className="w-full p-2.5 rounded border border-gray-300 text-black bg-white"
            required 
          />
        </div>
        <div className="mb-6 flex items-center">
          <input type="checkbox" id="terms" required className="mr-2" />
          <label htmlFor="terms" className="text-sm">
            J'accepte les conditions générales d'utilisation
          </label>
        </div>
        <button type="submit" className="w-full p-2.5 bg-[#007bff] rounded text-white text-lg mb-4 cursor-pointer">
          Créer mon compte
        </button>
        <div className="text-center">
          <p className="text-sm mb-2">Vous avez déjà un compte ?</p>
          <button onClick={() => navigate("/")} className="w-full p-2.5 bg-[#f8c700] rounded text-[#1c2448] text-lg cursor-pointer">
            Connectez-vous
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
