import { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../../firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const FormInput = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-5 py-4 bg-white/10 border-2 border-purple-400/30 rounded-xl
    focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
    placeholder-purple-300 text-white transition-all duration-300"
  />
);

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.type]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      if (!user.emailVerified) throw new Error("Please verify your email before logging in");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      }
      navigate("/dashboard");
    } catch {
      setError("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-indigo-900/30">
      <div className="absolute inset-0">
        <div className="absolute -left-4 -top-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -right-4 -bottom-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className="z-10 bg-white/5 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-purple-800/50 w-[90%] sm:w-[450px]">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Welcome Back</h2>
        
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl text-center mb-6">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5 mb-5">
          <FormInput type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <FormInput type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          
          <button disabled={loading} className="w-full py-4 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500
            rounded-xl font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button onClick={handleGoogleLogin} disabled={loading} 
          className="w-full py-4 !bg-white/95 !text-slate-800 font-medium rounded-xl flex items-center justify-center gap-3 
          border-[1px] border-gray-200/50 transition-all hover:scale-[1.02] hover:!bg-white disabled:opacity-50">
          <FcGoogle size={24} />Sign in with Google
        </button>

        <p className="text-center text-purple-200 pt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-pink-400 hover:text-pink-300 hover:underline">Sign Up</a>
        </p>
      </motion.div>
    </div>
  );
}