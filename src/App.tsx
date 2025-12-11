import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chrome, Sparkles, Zap, Code, Rocket, Mail, ExternalLink, Github } from "lucide-react"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="brand-wrapper">
            <img 
              src="/logo.svg" 
              alt="Unstacked Apps" 
              className="brand-logo"
            />
            <div className="brand-container">
              <span className="brand-name">
                <span className="brand-name-thin">un</span>stacked
              </span>
              <span className="brand-subtitle">apps</span>
            </div>
          </div>
          <Button variant="outline" asChild>
            <a href="mailto:contact@unstackedapps.com">
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Building Apps That
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {" "}Simplify Your Life
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            We create powerful Chrome extensions and AI assistants that enhance your productivity
            and streamline your workflow. Modern tools for modern professionals.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-lg" asChild>
              <a href="#apps">Explore Our Apps</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Apps Section */}
      <section id="apps" className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Apps
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful tools built specifically for NetSuite users
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Chrome className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">SuitePreferences</CardTitle>
                </div>
                <CardDescription className="text-base">
                  A Chrome extension that enhances your NetSuite experience with customizable preferences and productivity features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="px-2 py-1 bg-secondary rounded-md">Chrome Extension</span>
                    <span className="px-2 py-1 bg-secondary rounded-md">NetSuite</span>
                  </div>
                  <Button asChild className="w-full sm:w-auto">
                    <a 
                      href="https://chromewebstore.google.com/detail/suitepreferences/gdaohblaiiefllpkhpolbfeiacbpommo" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Get from Chrome Web Store
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">OpenSuiteMCP</CardTitle>
                </div>
                <CardDescription className="text-base">
                  An open-source AI assistant for NetSuite that helps you work smarter with intelligent automation and insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="px-2 py-1 bg-secondary rounded-md">AI Assistant</span>
                    <span className="px-2 py-1 bg-secondary rounded-md">Open Source</span>
                    <span className="px-2 py-1 bg-secondary rounded-md">NetSuite</span>
                  </div>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a 
                      href="https://github.com/opensuitemcp/opensuitemcp" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What We Build
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Innovative solutions designed to make your digital life easier
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Chrome className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Chrome Extensions</CardTitle>
                <CardDescription>
                  Powerful browser extensions that enhance your web experience and boost productivity
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Sparkles className="h-10 w-10 text-primary mb-4" />
                <CardTitle>AI Assistants</CardTitle>
                <CardDescription>
                  Intelligent AI-powered tools that help you work smarter and accomplish more
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Fast & Reliable</CardTitle>
                <CardDescription>
                  Built with modern technologies for speed, security, and seamless user experience
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Code className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Clean Code</CardTitle>
                <CardDescription>
                  Well-architected solutions that are maintainable, scalable, and future-proof
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Rocket className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Innovation First</CardTitle>
                <CardDescription>
                  We stay ahead of the curve, using the latest tools and best practices
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Mail className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Support & Updates</CardTitle>
                <CardDescription>
                  Regular updates and dedicated support to ensure your tools always work perfectly
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg mt-4">
                Discover our apps or get in touch to discuss your needs
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="text-lg" asChild>
                <a href="#apps">View Our Apps</a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <a href="mailto:contact@unstackedapps.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="brand-wrapper">
              <img 
                src="/logo.svg" 
                alt="Unstacked Apps" 
                className="brand-logo"
                style={{ height: '24px' }}
              />
              <div className="brand-container" style={{ height: '24px' }}>
                <span className="brand-name" style={{ fontSize: '18px' }}>
                  <span className="brand-name-thin">un</span>stacked
                </span>
                <span className="brand-subtitle" style={{ fontSize: '9px', marginTop: '-3px' }}>apps</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Unstacked Apps LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
