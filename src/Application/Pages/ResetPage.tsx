import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export const ResetPage: React.FC = () => {
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
      const response = await fakeHttpPost("/user", { email, password });
      const { success } = response.data;
      if (success) {
        console.log("Mot de passe réinitialisé avec succès");
        navigate("/"); // Rediriger l'utilisateur après une réinitialisation réussie
      }
    } catch (error: unknown) {
      console.error("Erreur de réinitialisation:", error);
      setError("Erreur lors de la réinitialisation. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#1c2448] text-white p-4">
      <form onSubmit={handleSubmit} className="bg-[#2d3658] p-6 rounded-lg shadow-md w-[300px] text-center">
        <h2 className="mb-6 text-2xl font-semibold">Réinitialisation mot de passe</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-left mb-2 text-md">
            Adresse mail
          </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
            placeholder="ex. toto.dupond@gmail.com"
            className="w-full p-2.5 rounded border border-gray-300 text-black bg-white"
            required 
          />
        </div>


        <div className="mb-4">
          <label htmlFor="password" className="block text-left mb-2 text-md">
            Mot de passe
          </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
            placeholder="********"
            className="w-full p-2.5 rounded border border-gray-300 text-black bg-white"
            required 
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirm-password" className="block text-left mb-2 text-md">
            Confirmation mot de passe
          </label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} 
            placeholder="********"
            className="w-full p-2.5 rounded border border-gray-300 text-black bg-white"
            required 
          />
        </div>

        <button
          type="submit"
          className="w-full p-2.5 bg-[#f8c700] rounded text-black text-lg mb-4 cursor-pointer"
        >
          Récupérer mon compte
        </button>

        <div className="relative w-full h-1 bg-[#f8c700] mb-6">
          <div className="absolute left-0 h-1 bg-[#007bff]" style={{ width: '50%' }}></div>
        </div>

        <div className="text-center">
          <h3 className="text-lg mb-4">SE CONNECTER</h3>
          <p className="text-sm mb-2">Vous avez déjà un compte ?</p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full p-2.5 bg-[#007bff] rounded text-white text-lg cursor-pointer"
          >
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
  return new Promise<{ data: { success: boolean } }>((resolve) =>
    setTimeout(() => resolve({ data: { success: true } }), 1000)
  );
}
