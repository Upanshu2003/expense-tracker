import { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { auth, db } from "../../../firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const FormInput = ({ type, placeholder, value, onChange, name }) => (
  <input
    type={type}
name={name}
placeholder={placeholder}
value={value}
onChange={onChange}
    className="w-full px-5 py-4 bg-white/10 border-2 border-purple-400/30 rounded-xl
    focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
    placeholder-purple-300 text-white transition-all duration-300"
  />
);

const Message = ({ error, success }) => error || success ? (
  <div className={`${error ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-green-500/10 border-green-500/50 text-green-500'}
    px-4 py-2 rounded-xl text-center mb-4 text-sm border`}>
    {error || success}
  </div>
) : null;

const VerificationMessage = () => (
  <div className="text-center space-y-4">
    <div className="text-5xl mb-4">✉️</div>
    <h3 className="text-2xl font-bold text-white">Check your email</h3>
    <p className="text-purple-200 text-sm">
      We've sent a verification link to your email address.<br/>
      Please verify your email to continue.
    </p>
    <a href="/login" 
      className="block mt-6 text-pink-400 hover:text-pink-300 hover:underline">
      Return to login
    </a>
  </div>
);

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (Object.values(formData).some(val => !val)) return "All fields are required";
    if (formData.password.length < 6) return "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await Promise.all([
        updateProfile(user, { displayName: formData.name }),
        setDoc(doc(db, "users", user.uid), {
          name: formData.name, email: formData.email,
          uid: user.uid, createdAt: new Date(), emailVerified: false
        }),
        sendEmailVerification(user)
      ]);

      setIsVerificationEmailSent(true);
    } catch (error) {
      setError(error.code === 'auth/email-already-in-use' 
        ? "This email is already registered" 
        : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName, email: user.email,
          uid: user.uid, createdAt: new Date()
        });
      }
      navigate("/dashboard");
    } catch {
      setError("Failed to register with Google");
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
        className="z-10 bg-white/5 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-purple-800/50 w-[85%] sm:w-[600px]">
        {isVerificationEmailSent ? (
          <VerificationMessage />
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center text-white mb-5">Create Account</h2>
            <Message error={error} success={success} />

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <FormInput 
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                />
                <FormInput 
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                  />
                  <FormInput 
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                  />
                </div>
              </div>

              <button disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500
                rounded-xl font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50">
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="flex items-center gap-4 my-4">
              <div className="h-px bg-purple-400/30 flex-1" />
              <span className="text-purple-300 text-sm">or</span>
              <div className="h-px bg-purple-400/30 flex-1" />
            </div>

            <button onClick={handleGoogleRegister} disabled={loading}
              className="w-full py-3 !bg-white/95 !text-slate-800 font-medium rounded-xl flex items-center justify-center gap-3 
              border-[1px] border-gray-200/50 transition-all hover:scale-[1.02] hover:!bg-white disabled:opacity-50">
              <FcGoogle size={20} />Sign up with Google
            </button>

            <p className="text-center text-purple-200 text-sm pt-4">
              Already have an account?{" "}
              <a href="/login" className="text-pink-400 hover:text-pink-300 hover:underline">Login</a>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}