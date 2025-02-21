import AuthContext from "./AuthContext";
import { auth } from "./firebase.int";

const AuthProvider = ({ children }) => {
  const authInfo = {
    name: "tareq", // ✅ Fixed assignment
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
