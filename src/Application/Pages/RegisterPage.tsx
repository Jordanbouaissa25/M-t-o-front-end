import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../../Infrastructure/Http/Axios.Instance";

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function inscription(email: string, password: string, confirmPassword: string) {

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return
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
      console.error("Le mot de passe doit contenir 8 caractères, ou l'adresse-mail est déja existante:", error);
      setError("Le mot de passe doit contenir 8 caracères, ou l'adresse-mail est déja existante.");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#2D2C5A] text-white p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          inscription(email, password, confirmPassword);
        }}
        className="p-6 rounded-lg w-[300px] text-center"
      >
        <h2 className="mb-6 text-2xl font-semibold">S'inscrire</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
            <label htmlFor="password">Mot de passe</label>
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
            <label htmlFor="password">Confirmation mot de passe</label>
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
            <div className="my-3">
             <div className="relative w-full h-1 bg-[#f8c700] mb-6"> <div className="absolute left-0 h-1 bg-[#007bff]" style={{ width: "50%" }} ></div>
             </div>
              </div>
               <div className="text-center">
                 <p className="text-sm mb-2">Vous avez déjà un compte ?</p>
                  <button onClick={() => navigate("/")} className="w-full p-2.5 bg-[#f8c700] rounded text-[#2D2C5A] text-lg cursor-pointer" > Connectez-vous </button>
                   </div> 
                  </form>
                    </div> ); };
