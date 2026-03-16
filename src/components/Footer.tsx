import { useNavigate } from "react-router-dom";
import idLogo from "@/assets/innovative-dynamics-logo.png";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="text-center py-8 border-t border-border">
      <p className="text-sm text-muted-foreground mb-3">Powered by</p>
      <img
        src={idLogo}
        alt="Innovative Dynamics"
        className="h-10 mx-auto cursor-default"
        onClick={() => navigate("/admin")}
      />
    </footer>
  );
}
