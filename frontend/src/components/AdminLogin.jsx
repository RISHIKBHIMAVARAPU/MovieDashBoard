// src/pages/AdminLogin.jsx
import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Phone, Lock } from "@mui/icons-material";
import { adminLogin } from "../services/authService.js";

const AdminLogin = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phoneNo || !password) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const { data } = await adminLogin(phoneNo, password);
      localStorage.setItem("token", data.token);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      console.error(err);
      alert("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9f9f9", // subtle light background
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          borderRadius: 3,
          boxShadow: "0px 6px 16px rgba(0,0,0,0.15)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Admin Login
          </Typography>

          {/* Phone Number */}
          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            variant="outlined"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"} // 👈 correct toggle
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.3,
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: 2,
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1259a7" },
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
