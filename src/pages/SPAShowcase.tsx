import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, Building2, FileText, Mail, Phone, MapPin, Briefcase, GraduationCap, Globe, Linkedin, Github } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileMenu } from "@/components/MobileMenu"

type SPAType = "user-management" | "company-profile" | "professional-resume"

export function SPAShowcase() {
  const [selectedSPA, setSelectedSPA] = useState<SPAType>("user-management")

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="brand-wrapper flex-shrink-0">
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
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" size="sm" className="sm:size-default whitespace-nowrap" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
            {/* Mobile menu */}
            <div className="md:hidden flex items-center gap-2">
              <MobileMenu />
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            SPA Examples
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground px-2">
            Explore different types of single-page applications we can build
          </p>
        </div>
      </section>

      {/* SPA Selector */}
      <section className="container mx-auto px-4 pb-6 sm:pb-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <Button
              variant={selectedSPA === "user-management" ? "default" : "outline"}
              onClick={() => setSelectedSPA("user-management")}
              className="gap-2 w-full sm:w-auto"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">User Management</span>
              <span className="sm:hidden">Users</span>
            </Button>
            <Button
              variant={selectedSPA === "company-profile" ? "default" : "outline"}
              onClick={() => setSelectedSPA("company-profile")}
              className="gap-2 w-full sm:w-auto"
            >
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Company Profile</span>
              <span className="sm:hidden">Company</span>
            </Button>
            <Button
              variant={selectedSPA === "professional-resume" ? "default" : "outline"}
              onClick={() => setSelectedSPA("professional-resume")}
              className="gap-2 w-full sm:w-auto"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Professional Resume</span>
              <span className="sm:hidden">Resume</span>
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
        <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
          <Users className="h-5 w-5 sm:h-6 sm:w-6" />
          User Management System
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          A comprehensive user management interface with role-based access control
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center">
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 sm:flex-initial">Add User</Button>
              <Button size="sm" variant="outline" className="flex-1 sm:flex-initial">Export</Button>
            </div>
            <input
              type="search"
              placeholder="Search users..."
              className="px-3 py-2 border rounded-md text-sm w-full sm:w-auto sm:min-w-[200px]"
            />
          </div>
          
          {/* Table with horizontal scroll on mobile */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Last Active</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{user.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{user.email}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        <span className="px-2 py-1 bg-secondary rounded-md text-xs">{user.role}</span>
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-md text-xs ${
                          user.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{user.lastActive}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
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
        </div>
      </CardContent>
    </Card>
  )
}

function CompanyProfileSPA() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
          <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
          Company Profile
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          A professional company profile and information management system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Company Information</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-start gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="break-words">Acme Corporation</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="break-words">123 Business St, San Francisco, CA 94105</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="break-all">contact@acmecorp.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="break-all">www.acmecorp.com</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">About</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Acme Corporation is a leading provider of innovative solutions for businesses worldwide. 
                We specialize in delivering high-quality products and services that drive growth and efficiency.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold">250+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Employees</div>
                </div>
                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold">50+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold">$10M+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Revenue</div>
                </div>
                <div className="p-3 sm:p-4 border rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold">15+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Years</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Services</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">Consulting</span>
                <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">Development</span>
                <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">Support</span>
                <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">Training</span>
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
        <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
          <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
          Professional Resume
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          A clean, professional resume layout with interactive sections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-left sm:text-center border-b pb-4 sm:pb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">John Doe</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">Senior Software Engineer</p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="break-all">john.doe@example.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span>+1 (555) 987-6543</span>
              </div>
              <div className="flex items-center gap-1">
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="break-all">linkedin.com/in/johndoe</span>
              </div>
              <div className="flex items-center gap-1">
                <Github className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="break-all">github.com/johndoe</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
              Experience
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 pl-3 sm:pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">Senior Software Engineer</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Tech Company Inc.</p>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">2020 - Present</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Lead development of scalable web applications using React and Node.js. 
                  Mentored junior developers and improved code quality standards.
                </p>
              </div>
              <div className="border-l-2 pl-3 sm:pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">Software Engineer</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Startup Co.</p>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">2018 - 2020</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Built and maintained customer-facing features. Collaborated with design team 
                  to implement responsive UI components.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
              Education
            </h3>
            <div className="border-l-2 pl-3 sm:pl-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Bachelor of Science in Computer Science</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">University of Technology</p>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">2014 - 2018</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">React</span>
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">TypeScript</span>
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">Node.js</span>
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">PostgreSQL</span>
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">AWS</span>
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">Docker</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

