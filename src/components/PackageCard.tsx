
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Package {
  id: string;
  name: string;
  price: string;
  tagline: string;
  delivery: string;
  features: string[];
  popular: boolean;
}

interface PackageCardProps {
  package: Package;
}

export const PackageCard = ({ package: pkg }: PackageCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelectPackage = () => {
    navigate(`/quote?package=${pkg.id}`);
  };

  return (
    <Card className={`relative h-fit transform hover:scale-105 transition-all duration-300 hover:shadow-xl ${
      pkg.popular 
        ? 'ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-purple-50' 
        : 'bg-white/80 backdrop-blur-sm hover:bg-white'
    }`}>
      {pkg.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Star className="w-3 h-3 mr-1" />
          Most Popular
        </Badge>
      )}
      
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900">{pkg.name}</CardTitle>
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {pkg.price}
        </div>
        <p className="text-gray-600 text-sm">{pkg.tagline}</p>
        <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          {pkg.delivery}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="font-medium text-gray-700">What's Included</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {pkg.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        <Button
          onClick={handleSelectPackage}
          className={`w-full ${
            pkg.popular
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          } transform hover:scale-105 transition-all duration-200`}
        >
          Select This Package
        </Button>
      </CardContent>
    </Card>
  );
};
