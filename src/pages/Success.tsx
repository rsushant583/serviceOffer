
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, MessageCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="max-w-md w-full bg-white/80 backdrop-blur-sm shadow-xl border-white/20">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-scale-in" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Quote Request Sent!
            </h1>
            <p className="text-gray-600">
              Thank you for your interest. I'll review your requirements and get back to you within 24 hours with a detailed proposal.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• I'll review your project details</li>
                <li>• Prepare a custom proposal</li>
                <li>• Send you a detailed quote via email</li>
                <li>• Schedule a call to discuss your project</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="flex-1 bg-white/50 border-white/20 hover:bg-white"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              
              <Button
                onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Me
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;
