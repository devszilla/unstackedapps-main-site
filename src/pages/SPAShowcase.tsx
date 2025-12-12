import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, Building2, FileText, Mail, Phone, MapPin, Briefcase, GraduationCap, Globe, Linkedin, Github } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"

type SPAType = "user-management" | "company-profile" | "professional-resume"

export function SPAShowcase() {
  const [selectedSPA, setSelectedSPA] = useState<SPAType>("user-management")

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="brand-wrapper">
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
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            SPA Examples
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore different types of single-page applications we can build
          </p>
        </div>
      </section>

      {/* SPA Selector */}
      <section className="container mx-auto px-4 pb-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedSPA === "user-management" ? "default" : "outline"}
              onClick={() => setSelectedSPA("user-management")}
              className="gap-2"
            >
              <Users className="h-4 w-4" />
              User Management
            </Button>
            <Button
              variant={selectedSPA === "company-profile" ? "default" : "outline"}
              onClick={() => setSelectedSPA("company-profile")}
              className="gap-2"
            >
              <Building2 className="h-4 w-4" />
              Company Profile
            </Button>
            <Button
              variant={selectedSPA === "professional-resume" ? "default" : "outline"}
              onClick={() => setSelectedSPA("professional-resume")}
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              Professional Resume
            </Button>
          </div>
        </div>
      </section>

      {/* SPA Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          {selectedSPA === "user-management" && <UserManagementSPA />}
          {selectedSPA === "company-profile" && <CompanyProfileSPA />}
          {selectedSPA === "professional-resume" && <ProfessionalResumeSPA />}
        </div>
      </section>
    </div>
  )
}

function UserManagementSPA() {
  const users = [
    { id: 1, name: "Sarah Johnson", email: "sarah.johnson@example.com", role: "Admin", status: "Active", lastActive: "2 hours ago" },
    { id: 2, name: "Michael Chen", email: "michael.chen@example.com", role: "Editor", status: "Active", lastActive: "5 minutes ago" },
    { id: 3, name: "Emily Rodriguez", email: "emily.rodriguez@example.com", role: "Viewer", status: "Inactive", lastActive: "3 days ago" },
    { id: 4, name: "David Kim", email: "david.kim@example.com", role: "Editor", status: "Active", lastActive: "1 hour ago" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Users className="h-6 w-6" />
          User Management System
        </CardTitle>
        <CardDescription>
          A comprehensive user management interface with role-based access control
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button size="sm">Add User</Button>
              <Button size="sm" variant="outline">Export</Button>
            </div>
            <input
              type="search"
              placeholder="Search users..."
              className="px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Last Active</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">{user.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 bg-secondary rounded-md text-xs">{user.role}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-md text-xs ${
                        user.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{user.lastActive}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">Edit</Button>
                        <Button size="sm" variant="ghost">Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CompanyProfileSPA() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          Company Profile
        </CardTitle>
        <CardDescription>
          A professional company profile and information management system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Company Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>Acme Corporation</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>123 Business St, San Francisco, CA 94105</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>contact@acmecorp.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>www.acmecorp.com</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-sm text-muted-foreground">
                Acme Corporation is a leading provider of innovative solutions for businesses worldwide. 
                We specialize in delivering high-quality products and services that drive growth and efficiency.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold">250+</div>
                  <div className="text-sm text-muted-foreground">Employees</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold">$10M+</div>
                  <div className="text-sm text-muted-foreground">Revenue</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm text-muted-foreground">Years</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Services</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary rounded-md text-sm">Consulting</span>
                <span className="px-3 py-1 bg-secondary rounded-md text-sm">Development</span>
                <span className="px-3 py-1 bg-secondary rounded-md text-sm">Support</span>
                <span className="px-3 py-1 bg-secondary rounded-md text-sm">Training</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProfessionalResumeSPA() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Professional Resume
        </CardTitle>
        <CardDescription>
          A clean, professional resume layout with interactive sections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center border-b pb-6">
            <h2 className="text-3xl font-bold mb-2">John Doe</h2>
            <p className="text-muted-foreground mb-4">Senior Software Engineer</p>
            <div className="flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 987-6543</span>
              </div>
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" />
                <span>linkedin.com/in/johndoe</span>
              </div>
              <div className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                <span>github.com/johndoe</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Experience
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="font-semibold">Senior Software Engineer</h4>
                    <p className="text-sm text-muted-foreground">Tech Company Inc.</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2020 - Present</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Lead development of scalable web applications using React and Node.js. 
                  Mentored junior developers and improved code quality standards.
                </p>
              </div>
              <div className="border-l-2 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="font-semibold">Software Engineer</h4>
                    <p className="text-sm text-muted-foreground">Startup Co.</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2018 - 2020</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Built and maintained customer-facing features. Collaborated with design team 
                  to implement responsive UI components.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </h3>
            <div className="border-l-2 pl-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h4 className="font-semibold">Bachelor of Science in Computer Science</h4>
                  <p className="text-sm text-muted-foreground">University of Technology</p>
                </div>
                <span className="text-sm text-muted-foreground">2014 - 2018</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-secondary rounded-md text-sm">React</span>
              <span className="px-3 py-1 bg-secondary rounded-md text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-secondary rounded-md text-sm">Node.js</span>
              <span className="px-3 py-1 bg-secondary rounded-md text-sm">PostgreSQL</span>
              <span className="px-3 py-1 bg-secondary rounded-md text-sm">AWS</span>
              <span className="px-3 py-1 bg-secondary rounded-md text-sm">Docker</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

