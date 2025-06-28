import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const packageNames = {
  starter: "Starter Package",
  business: "Business Package", 
  professional: "Professional Package",
  ecommerce: "E-commerce Package",
  premium: "Premium Package",
  "ai-enterprise": "AI Enterprise Package"
};

export const Quote = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const selectedPackage = searchParams.get('package') || '';
  const packageName = packageNames[selectedPackage as keyof typeof packageNames] || 'Custom Package';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    package: selectedPackage,
    addDomainHosting: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      addDomainHosting: checked
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert quote request into Supabase
      const { data, error } = await supabase.from('quote_requests').insert([
        {
          client_name: formData.name,
          client_email: formData.email,
          client_phone: formData.phone,
          selected_package: selectedPackage,
          package_name: packageName,
          project_details: formData.message,
          domain_hosting_added: formData.addDomainHosting,
          base_price: 'N/A', // You can update this if you have base price logic
          additional_cost: formData.addDomainHosting ? '₹10,500' : '₹0',
          total_estimated_cost: 'N/A', // You can update this if you have total cost logic
        }
      ]);
      if (error) throw error;

      // Send email via backend API
      await fetch('/api/send-quote-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: formData.name,
          client_email: formData.email,
          client_phone: formData.phone,
          selected_package: selectedPackage,
          package_name: packageName,
          project_details: formData.message,
          domain_hosting_added: formData.addDomainHosting,
          additional_cost: formData.addDomainHosting ? '₹10,500' : '₹0',
        })
      });

      toast({
        title: "Quote Request Sent!",
        description: "I'll get back to you within 24 hours.",
      });
      navigate('/success');
    } catch (error) {
      console.error('Error sending quote:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-white/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Packages
        </Button>

        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Get Your Quote
            </CardTitle>
            <p className="text-gray-600 mt-2">
              You've selected: <span className="font-semibold text-blue-600">{packageName}</span>
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white/50 border-white/20 focus:bg-white"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/50 border-white/20 focus:bg-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-white/50 border-white/20 focus:bg-white"
                  placeholder="Your phone number (optional)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Project Details</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-white/50 border-white/20 focus:bg-white min-h-32"
                  placeholder="Tell me about your project, timeline, specific requirements, or any questions you have..."
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="domainHosting"
                    checked={formData.addDomainHosting}
                    onCheckedChange={handleCheckboxChange}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="domainHosting" className="text-sm font-medium cursor-pointer">
                      Add Domain & Hosting Package (+₹10,500)
                    </Label>
                    <div className="text-xs text-gray-600">
                      <p>• 1-year premium domain registration</p>
                      <p>• Professional website hosting</p>
                      <p>• Complete testing & optimization</p>
                      <p>• 1 month training & debugging support</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 py-6 text-lg font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending Quote Request...
                  </>
                ) : (
                  <>
                    Send Quote Request
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quote;
