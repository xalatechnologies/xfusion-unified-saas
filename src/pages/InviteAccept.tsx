import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthActions } from "@/hooks/useAuthActions";
import { databaseApi } from "@/lib/database";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function InviteAccept() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuthState();
  const { signUp, signIn } = useAuthActions();

  const [invitation, setInvitation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (token) {
      loadInvitation();
    }
  }, [token]);

  useEffect(() => {
    // If user is already logged in and we have a valid invitation, auto-accept
    if (user && invitation && !accepting) {
      handleAcceptInvitation();
    }
  }, [user, invitation]);

  const loadInvitation = async () => {
    try {
      const invitationData = await databaseApi.getInvitationByToken(token!);
      if (invitationData) {
        setInvitation(invitationData);
        setEmail(invitationData.invited_email);
      } else {
        toast({
          title: "Invalid Invitation",
          description: "This invitation link is invalid or has expired.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error loading invitation:", error);
      toast({
        title: "Error",
        description: "Failed to load invitation details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptInvitation = async () => {
    if (!user || !invitation) return;

    setAccepting(true);
    try {
      const success = await databaseApi.acceptInvitation(token!, user.id);
      if (success) {
        toast({
          title: "Welcome to the team!",
          description: `You've successfully joined ${invitation.organization_name}.`,
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Error",
          description: "Failed to accept invitation. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error accepting invitation:", error);
      toast({
        title: "Error",
        description: "Failed to accept invitation.",
        variant: "destructive",
      });
    } finally {
      setAccepting(false);
    }
  };

  const handleAuth = async () => {
    if (isSignUp) {
      if (password !== confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await signUp(email, password);
      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created",
          description: "Please check your email for verification.",
        });
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Invalid Invitation</h2>
            <p className="text-gray-600 mb-4">
              This invitation link is invalid or has expired.
            </p>
            <Button onClick={() => navigate("/")} variant="outline">
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (accepting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Joining Organization</h2>
            <p className="text-gray-600">Please wait while we process your invitation...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <CardTitle>You're Invited!</CardTitle>
          <p className="text-gray-600">
            You've been invited to join <strong>{invitation.organization_name}</strong> as a{" "}
            <strong>{invitation.role}</strong>.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!user ? (
            <>
              <div className="flex space-x-2 mb-4">
                <Button
                  variant={isSignUp ? "default" : "outline"}
                  onClick={() => setIsSignUp(true)}
                  className="flex-1"
                >
                  Sign Up
                </Button>
                <Button
                  variant={!isSignUp ? "default" : "outline"}
                  onClick={() => setIsSignUp(false)}
                  className="flex-1"
                >
                  Sign In
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {isSignUp && (
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <Button onClick={handleAuth} className="w-full">
                {isSignUp ? "Create Account & Join" : "Sign In & Join"}
              </Button>
            </>
          ) : (
            <div className="text-center">
              <p className="mb-4">Welcome back, {user.email}!</p>
              <Button onClick={handleAcceptInvitation} className="w-full">
                Accept Invitation
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
