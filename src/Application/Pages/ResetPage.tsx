import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../../Infrastructure/Http/Axios.Instance";

export const ResetPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error] = useState<string | null>(null);
  const navigate = useNavigate();

async function reinitialisation(email: string, newPassword: string) {
  try {
    const response = await http.put("/userResPassword", { email, newPassword });

    if (response.status === 200) {  // Modifier pour vérifier un statut 200
      console.log("Réinitialisation réussie");
      // Si nécessaire, traiter les données de la réponse ici
      navigate("/"); // Rediriger l'utilisateur après une réinitialisation réussie
    } else {
      console.log("Impossible de réinitialiser le mot de passe");
    }
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    // Gérer l'affichage d'une erreur à l'utilisateur ici si nécessaire
  }
}

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#2D2C5A] text-white p-4">
      <form onSubmit={(e)=>{e.preventDefault();reinitialisation(email, password)}} className="p-6 rounded-lg w-[300px] text-center">
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
           Nouveau mot de passe
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
            Confirmation nouveau mot de passe
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

        <div className="relative w-full h-1 bg-[#f8c700] mb-6 my-4">
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
