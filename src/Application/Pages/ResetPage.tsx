import React, { useState, ChangeEvent, FormEvent } from "react";
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

    try {
      const response = await fakeHttpPost("/reset", { email, password });
      const { token, _id } = response.data;
      if (token && _id) {
        login(token, _id);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", _id);

        console.log("Reinitialisation réussie");
        console.log("token", token);
        console.log("UserId", _id);

        navigate("/login"); // Rediriger l'utilisateur après une reinitialisation réussie
      }
    } catch (error: unknown) {
      console.error("Erreur de reinitialisation:", error);
      setError("Erreur lors de la reinitialisation. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#1c2448] text-white p-4">
      <form onSubmit={handleSubmit} className="bg-[#2d3658] p-6 rounded-lg shadow-md w-[300px] text-center">
        <h2 className="mb-6 text-2xl font-semibold">S'inscrire</h2>

        <div className="relative right-20">
                <label htmlFor="mail" className="mb-2 text-md">Adresse mail</label>
                </div>
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

        <div className="relative right-20">
                <label htmlFor="password" className="mb-2 text-md">Mot de passe</label>
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

        <div className="relative right-8">
                <label htmlFor="Confirm password" className="mb-2 text-md">Confirmation mot de passe</label>
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

        <button className="w-full p-2.5 bg-[#007bff] rounded text-white text-lg mb-4 cursor-pointer">
          Créer mon compte
        </button>

        <div className="relative w-full h-1 bg-[#f8c700] mb-6">
          <div className="absolute left-0 h-1 bg-[#007bff]" style={{ width: '50%' }}></div>
        </div>

        <div className="text-center">
          <h3 className="text-lg mb-4">SE CONNECTER</h3>
          <p className="text-sm mb-2">Vous avez déjà un compte ?</p>
          <button onClick={() => navigate("/login")} className="w-full p-2.5 bg-[#f8c700] rounded text-[#1c2448] text-lg cursor-pointer">
            Connectez-vous
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
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
