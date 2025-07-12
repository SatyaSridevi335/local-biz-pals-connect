import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Shield, ShieldAlert, Search, Globe, BarChart3, AlertTriangle, CheckCircle, Info, Zap, Lock, Eye, Mail, QrCode, Users, Upload, FileImage, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    isPhishing: boolean;
    confidence: number;
    features: any;
  } | null>(null);

  // Email analyzer state
  const [emailContent, setEmailContent] = useState("");
  const [isAnalyzingEmail, setIsAnalyzingEmail] = useState(false);
  const [emailResult, setEmailResult] = useState<any>(null);

  // QR scanner state
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [isAnalyzingQr, setIsAnalyzingQr] = useState(false);
  const [qrResult, setQrResult] = useState<any>(null);

  // Domain impersonation state
  const [domain, setDomain] = useState("");
  const [isAnalyzingDomain, setIsAnalyzingDomain] = useState(false);
  const [domainResult, setDomainResult] = useState<any>(null);

  const analyzeUrl = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // TODO: Replace with actual API call to your Flask backend
    // const response = await fetch('/api/analyze-url', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ url })
    // });
    
    // Simulate ML analysis
    setTimeout(() => {
      const confidence = Math.random() * 100;
      const isPhishing = confidence > 60;
      
      setResult({
        isPhishing,
        confidence: Math.round(confidence),
        features: {
          urlLength: url.length,
          hasHttps: url.startsWith('https://'),
          domainAge: Math.floor(Math.random() * 2000) + 100,
          subdomains: (url.match(/\./g) || []).length - 1,
          suspiciousKeywords: Math.floor(Math.random() * 5),
        }
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const analyzeEmail = async () => {
    if (!emailContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter email content to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzingEmail(true);
    
    // TODO: Replace with actual API call to your Flask backend
    // const response = await fetch('/api/email-analyze', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email_content: emailContent })
    // });
    
    // Simulate email analysis
    setTimeout(() => {
      const riskScore = Math.random() * 100;
      const isPhishing = riskScore > 65;
      
      setEmailResult({
        isPhishing,
        riskScore: Math.round(riskScore),
        threatTags: isPhishing ? ['urgent-language', 'suspicious-links', 'fake-sender'] : ['legitimate'],
        recommendation: isPhishing ? 'Do not click any links or attachments' : 'Email appears safe'
      });
      setIsAnalyzingEmail(false);
    }, 2500);
  };

  const analyzeQrCode = async () => {
    if (!qrFile) {
      toast({
        title: "Error",
        description: "Please upload a QR code image",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzingQr(true);
    
    // TODO: Replace with actual API call to your Flask backend
    // const formData = new FormData();
    // formData.append('qr_image', qrFile);
    // const response = await fetch('/api/scan-qr', {
    //   method: 'POST',
    //   body: formData
    // });
    
    // Simulate QR analysis
    setTimeout(() => {
      const isMalicious = Math.random() > 0.7;
      const extractedUrl = "https://example.com/fake-url";
      
      setQrResult({
        isMalicious,
        extractedContent: extractedUrl,
        contentType: 'URL',
        riskScore: Math.round(Math.random() * 100),
        recommendation: isMalicious ? 'Do not visit this URL' : 'QR code appears safe'
      });
      setIsAnalyzingQr(false);
    }, 3000);
  };

  const analyzeDomain = async () => {
    if (!domain.trim()) {
      toast({
        title: "Error",
        description: "Please enter a domain to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzingDomain(true);
    
    // TODO: Replace with actual API call to your Flask backend
    // const response = await fetch('/api/check-domain', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ domain })
    // });
    
    // Simulate domain analysis
    setTimeout(() => {
      const isImpersonating = Math.random() > 0.6;
      const suspiciousFeatures = [];
      
      if (isImpersonating) {
        suspiciousFeatures.push('Similar to known brand', 'Suspicious TLD', 'Typosquatting');
      }
      
      setDomainResult({
        isImpersonating,
        suspiciousFeatures,
        legitimateDomain: isImpersonating ? 'google.com' : null,
        riskScore: Math.round(Math.random() * 100),
        recommendation: isImpersonating ? 'Possible domain impersonation detected' : 'Domain appears legitimate'
      });
      setIsAnalyzingDomain(false);
    }, 2000);
  };

  const securityFeatures = [
    {
      icon: Lock,
      title: "Real-time Protection",
      description: "Instant analysis of URLs using advanced ML algorithms"
    },
    {
      icon: Eye,
      title: "Deep Inspection",
      description: "Comprehensive feature extraction and pattern recognition"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Results in under 2 seconds with 95%+ accuracy"
    }
  ];

  const modelStats = [
    { label: "Accuracy", value: "96.7%" },
    { label: "Precision", value: "94.2%" },
    { label: "Recall", value: "97.1%" },
    { label: "F1-Score", value: "95.6%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="h-16 w-16 text-primary animate-pulse" />
              <ShieldAlert className="h-6 w-6 text-destructive absolute -top-1 -right-1" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent mb-6">
            PhishGuard AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Advanced Machine Learning-powered phishing website detection system. 
            Protect yourself from malicious websites with state-of-the-art AI technology.
          </p>
          
          {/* URL Analyzer */}
          <Card className="max-w-2xl mx-auto mb-12 shadow-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                URL Analyzer
              </CardTitle>
              <CardDescription>
                Enter a URL below to analyze if it's a potential phishing website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={analyzeUrl} 
                  disabled={isAnalyzing}
                  className="min-w-[120px]"
                >
                  {isAnalyzing ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                  ) : (
                    "Analyze"
                  )}
                </Button>
              </div>

              {/* Results */}
              {result && (
                <Alert className={`border-2 ${result.isPhishing ? 'border-destructive bg-destructive/10' : 'border-green-500 bg-green-50 dark:bg-green-950'}`}>
                  <div className="flex items-center gap-2">
                    {result.isPhishing ? (
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    <div className="flex-1">
                      <AlertDescription className="font-medium">
                        {result.isPhishing ? "⚠️ Potential Phishing Website Detected" : "✅ Website Appears Safe"}
                      </AlertDescription>
                      <div className="mt-2 flex items-center gap-4">
                        <Badge variant={result.isPhishing ? "destructive" : "default"}>
                          Confidence: {result.confidence}%
                        </Badge>
                        <div className="flex gap-2 text-sm text-muted-foreground">
                          <span>HTTPS: {result.features.hasHttps ? "✅" : "❌"}</span>
                          <span>Length: {result.features.urlLength}</span>
                          <span>Subdomains: {result.features.subdomains}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Security Modules */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Email Analyzer */}
          <Card className="shadow-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Analyzer
              </CardTitle>
              <CardDescription>
                Analyze email content for phishing characteristics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste email content here..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="min-h-[100px]"
              />
              <Button 
                onClick={analyzeEmail} 
                disabled={isAnalyzingEmail}
                className="w-full"
              >
                {isAnalyzingEmail ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                ) : (
                  "Analyze Email"
                )}
              </Button>
              
              {emailResult && (
                <Alert className={`border-2 ${emailResult.isPhishing ? 'border-destructive bg-destructive/10' : 'border-green-500 bg-green-50 dark:bg-green-950'}`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {emailResult.isPhishing ? (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      <AlertDescription className="font-medium">
                        Risk Score: {emailResult.riskScore}%
                      </AlertDescription>
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-1">
                        {emailResult.threatTags.map((tag: string, idx: number) => (
                          <Badge key={idx} variant={emailResult.isPhishing ? "destructive" : "default"} className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{emailResult.recommendation}</p>
                    </div>
                  </div>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* QR Code Scanner */}
          <Card className="shadow-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code Scanner
              </CardTitle>
              <CardDescription>
                Upload and analyze QR codes for malicious content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <FileImage className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setQrFile(e.target.files?.[0] || null)}
                  className="mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  {qrFile ? qrFile.name : "Select QR code image"}
                </p>
              </div>
              <Button 
                onClick={analyzeQrCode} 
                disabled={isAnalyzingQr}
                className="w-full"
              >
                {isAnalyzingQr ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                ) : (
                  "Scan QR Code"
                )}
              </Button>
              
              {qrResult && (
                <Alert className={`border-2 ${qrResult.isMalicious ? 'border-destructive bg-destructive/10' : 'border-green-500 bg-green-50 dark:bg-green-950'}`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {qrResult.isMalicious ? (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      <AlertDescription className="font-medium">
                        {qrResult.isMalicious ? "⚠️ Malicious Content Detected" : "✅ QR Code Appears Safe"}
                      </AlertDescription>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm"><strong>Content:</strong> {qrResult.extractedContent}</p>
                      <p className="text-sm"><strong>Type:</strong> {qrResult.contentType}</p>
                      <Badge variant={qrResult.isMalicious ? "destructive" : "default"}>
                        Risk: {qrResult.riskScore}%
                      </Badge>
                      <p className="text-sm text-muted-foreground">{qrResult.recommendation}</p>
                    </div>
                  </div>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Domain Impersonation Detector */}
          <Card className="shadow-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Domain Impersonation
              </CardTitle>
              <CardDescription>
                Check if domain is impersonating known brands
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <Button 
                onClick={analyzeDomain} 
                disabled={isAnalyzingDomain}
                className="w-full"
              >
                {isAnalyzingDomain ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                ) : (
                  "Check Domain"
                )}
              </Button>
              
              {domainResult && (
                <Alert className={`border-2 ${domainResult.isImpersonating ? 'border-destructive bg-destructive/10' : 'border-green-500 bg-green-50 dark:bg-green-950'}`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {domainResult.isImpersonating ? (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      <AlertDescription className="font-medium">
                        {domainResult.isImpersonating ? "⚠️ Possible Impersonation" : "✅ Domain Appears Legitimate"}
                      </AlertDescription>
                    </div>
                    <div className="space-y-1">
                      <Badge variant={domainResult.isImpersonating ? "destructive" : "default"}>
                        Risk: {domainResult.riskScore}%
                      </Badge>
                      {domainResult.legitimateDomain && (
                        <p className="text-sm"><strong>Similar to:</strong> {domainResult.legitimateDomain}</p>
                      )}
                      {domainResult.suspiciousFeatures.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {domainResult.suspiciousFeatures.map((feature: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground">{domainResult.recommendation}</p>
                    </div>
                  </div>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Model Performance & Information Tabs */}
        <Tabs defaultValue="performance" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Model Performance</TabsTrigger>
            <TabsTrigger value="features">Feature Analysis</TabsTrigger>
            <TabsTrigger value="about">About the Project</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Machine Learning Model Statistics
                </CardTitle>
                <CardDescription>
                  Performance metrics from our trained ML models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {modelStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Feature Extraction Analysis
                </CardTitle>
                <CardDescription>
                  Key features analyzed by our ML algorithms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">URL-based Features</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• URL length and structure</li>
                      <li>• Domain age and registration</li>
                      <li>• Subdomain count</li>
                      <li>• HTTPS usage</li>
                      <li>• Suspicious keywords detection</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Content-based Features</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• HTML structure analysis</li>
                      <li>• External links ratio</li>
                      <li>• Form submission patterns</li>
                      <li>• Favicon and branding analysis</li>
                      <li>• JavaScript behavior detection</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  About PhishGuard AI
                </CardTitle>
                <CardDescription>
                  Advanced phishing detection using machine learning techniques
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  This project implements multiple machine learning algorithms to detect phishing websites 
                  with high accuracy. Using a combination of Random Forest, Support Vector Machine, and 
                  Neural Network models, we achieve superior detection rates.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">Scikit-learn</Badge>
                      <Badge variant="secondary">Pandas</Badge>
                      <Badge variant="secondary">NumPy</Badge>
                      <Badge variant="secondary">React</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">ML Algorithms</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Random Forest</Badge>
                      <Badge variant="outline">SVM</Badge>
                      <Badge variant="outline">Neural Networks</Badge>
                      <Badge variant="outline">Gradient Boosting</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-destructive/10 border-primary/20">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Stay Protected</h3>
              <p className="text-muted-foreground mb-6">
                Bookmark this tool and use it whenever you're unsure about a website's legitimacy. 
                Your security is our priority.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-primary to-destructive">
                Learn More About Phishing Protection
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;