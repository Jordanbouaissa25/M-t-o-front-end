import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../../Infrastructure/Http/Axios.Instance";

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function Password8Characters(password: string) {
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return false;
    }

    try {
      const response = await http.put("/user", { password });
      console.log(response.data)
      if (response.status === 200) {
        console.log("Mot de passe accepté");
        return true;
      } else {
        setError("Mot de passe invalide.");
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la validation du mot de passe:", error);
      setError("Erreur lors de la validation du mot de passe.");
      return false;
    }
  }

  async function inscription(email: string, password: string) {
    const isPasswordValid = await Password8Characters(password);

    if (!isPasswordValid) {
      return;
    }

    try {
      const response = await http.post("/register", { email, password });

      if (response.status === 201) {
        console.log("Inscription réussie");
        const token = response.data.token;
        const _id = response.data._id;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", _id);
        navigate("/"); // Rediriger l'utilisateur après une inscription réussie
      } else {
        setError("Impossible de s'inscrire.");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setError("Erreur lors de l'inscription.");
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#1c2448] text-white p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          inscription(email, password);
        }}
        className="bg-[#2d3658] p-6 rounded-lg shadow-md w-[300px] text-center"
      >
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
          <label htmlFor="terms" className="texte-sm">J'accepte les conditions générales d'utilisation</label>
           </div>
            <button type="submit" className="w-full p-2.5 bg-[#007bff] rounded text-white text-lg mb-4 cursor-pointer" > Créer mon compte </button>
             <div className="relative w-full h-1 bg-[#f8c700] mb-6"> <div className="absolute left-0 h-1 bg-[#007bff]" style={{ width: "50%" }} ></div>
              </div>
               <div className="text-center">
                 <p className="text-sm mb-2">Vous avez déjà un compte ?</p>
                  <button onClick={() => navigate("/")} className="w-full p-2.5 bg-[#f8c700] rounded text-[#1c2448] text-lg cursor-pointer" > Connectez-vous </button>
                   </div> 
                  </form>
                    </div> ); };
