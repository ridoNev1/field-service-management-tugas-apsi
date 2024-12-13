import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackgroundImages } from "@/assets/export";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div>
      <div
        className="min-h-40 bg-cover"
        style={{
          backgroundImage: `url(${BackgroundImages})`,
        }}
      >
        <div className="bg-black/40 h-40 w-full"></div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-full p-8">
          <p className="text-2xl font-bold">Welcome Back</p>
          <div className="mt-8">
            <div className="w-full">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="w-full mt-4">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Email" />
            </div>
            <Link to="/home">
              <Button className="mt-10 w-full bg-blue-500 hover:bg-blue-400">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
